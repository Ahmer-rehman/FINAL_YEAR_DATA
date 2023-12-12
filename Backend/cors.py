from flask import Flask, request, jsonify
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
        return jsonify({'error': 'No image provided'}), 400

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
        return jsonify({'mood': mood, 'music_recommendations': music_recommendations})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(temp_path)  # Clean up the saved image


if __name__ == '__main__':
    app.run(host="0.0.0.0")  # set debug=False in production
