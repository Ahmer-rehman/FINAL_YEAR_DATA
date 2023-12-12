import os
import random
import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image

def load_model(model_path=None):
    model = models.resnet50(pretrained=True)
    num_mood_classes = 5
    model.fc = torch.nn.Linear(model.fc.in_features, num_mood_classes)
    if model_path:
        model.load_state_dict(torch.load(model_path))
    model.eval()
    if torch.cuda.is_available():
        model.to('cuda')
    return model

# Image preprocessing function
def preprocess_image(image_path):
    try:
        input_image = Image.open(image_path)
    except IOError:
        return None
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    input_tensor = preprocess(input_image)
    return input_tensor.unsqueeze(0)

# Mood prediction function
def predict_mood(image_path, model):
    input_batch = preprocess_image(image_path)
    if input_batch is None:
        return None
    if torch.cuda.is_available():
        input_batch = input_batch.to('cuda')
    with torch.no_grad():
        output = model(input_batch)
    probabilities = torch.nn.functional.softmax(output[0], dim=0)
    return torch.argmax(probabilities).item()

mood_to_folder = {
    0: "happy",
    1: "sad",
    2: "energetic",
    3: "relaxed",
    4: "angry"
}

def recommend_music(mood):
    mood_folder = mood_to_folder.get(mood)
    if not mood_folder:
        print(f"No folder found for mood: {mood}")
        return []

    song_folder_path = os.path.join('./songs', mood_folder)
    try:
        songs = [song for song in os.listdir(song_folder_path) if song.endswith(".wav")]
        if not songs:
            print(f"No .WAV files found in {song_folder_path}")
        return random.sample(songs, min(10, len(songs)))
    except FileNotFoundError:
        print(f"Directory not found: {song_folder_path}")
        return []

def main(image_path, model_path=None):
    model = load_model(model_path)
    mood = predict_mood(image_path, model)
    if mood is None:
        print("Error processing the image.")
        return
    music_recommendations = recommend_music(mood)
    print("Mood:", mood)
    print("Music Recommendations:", music_recommendations)
    print("Music Recommendations:", type(music_recommendations))
