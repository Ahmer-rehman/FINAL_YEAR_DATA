from flask import Flask, request, Response
import os
import werkzeug
import main

app = Flask(__name__)

# Load the model once when the server starts
model = main.load_model()


@app.route('/mood', methods=['POST'])
def predict_mood():
    # Check if an image is provided
    if 'image' not in request.files:
        return Response('No image provided', status=400)

    image_file = request.files['image']

    # Save the image temporarily
    filename = werkzeug.utils.secure_filename(image_file.filename)
    temp_path = os.path.join('./tmp', filename)
    print(filename)
    image_file.save(temp_path)

    try:
        mood = main.predict_mood(temp_path, model)
        if mood is None:
            raise ValueError("Could not process image")

        music_recommendations = main.recommend_music(mood)

        # Assuming you have a WAV file ready to be served, replace 'your_wav_file_path' with the actual file path.
        wav_file_path = './songs'

        def generate():
            with open(wav_file_path, 'rb') as wav_file:
                yield wav_file.read()

        return Response(generate(), mimetype='audio/wav')
    except Exception as e:
        return Response(str(e), status=500)
    finally:
        os.remove(temp_path)  # Clean up the saved image


if __name__ == '__main__':
    app.run(host="0.0.0.0")  # set debug=False in production
