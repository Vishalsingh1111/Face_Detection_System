

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import cv2
from models import save_user, find_matching_user
from face_utils import encode_face
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Match Face API (Automatically checks for a match)
@app.route("/api/match", methods=["POST"])
def match():
    data = request.json
    image_data = data.get("image")

    if not image_data:
        return jsonify({"error": "Image is required!"}), 400

    # Decode Base64 Image
    image_bytes = base64.b64decode(image_data)
    image_path = "temp_match.jpg"
    with open(image_path, "wb") as f:
        f.write(image_bytes)

    try:
        face_encoding = encode_face(image_path)
        result = find_matching_user(face_encoding)
        return jsonify(result)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

# Register Face API (Only called if no match is found)
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    image_data = data.get("image")
    username = data.get("username")

    if not image_data or not username:
        return jsonify({"error": "Image and username are required!"}), 400

    image_bytes = base64.b64decode(image_data)
    image_path = "temp_register.jpg"
    with open(image_path, "wb") as f:
        f.write(image_bytes)

    try:
        face_encoding = encode_face(image_path)
        save_user(face_encoding, username)
        return jsonify({"message": "User registered successfully!"})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    # Get the PORT from environment variables for Render deployment
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=False, host="0.0.0.0", port=port)
