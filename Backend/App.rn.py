from flask import Flask, request, jsonify
import os
import main  # Assuming you have a main module for mood prediction
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict_mood', methods=['POST'])
def predict_mood():
    data = request.json
    if 'image' not in data:
        return jsonify({'error': 'No image data'}), 400

    image_base64 = data['image']

    # Ensure the image is in PNG or JPG format
    if not image_base64.startswith('data:image/png;base64,') and not image_base64.startswith('data:image/jpeg;base64,'):
        return jsonify({'error': 'Invalid image format. Only PNG and JPEG images are supported.'}), 400

    image_data = image_base64.split(',')[-1]
    image_extension = 'png' if image_base64.startswith('data:image/png;base64,') else 'jpg'

    # Define the image path
    image_path = 'images/image.' + image_extension

    # Save the image to the specified path
    try:
        with open(image_path, 'wb') as file:
            file.write(image_data.decode('base64'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    try:
        mood, music_recommendations = main.predict_mood(image_path)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({
        'mood': mood,
        'music_recommendations': music_recommendations
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0")
