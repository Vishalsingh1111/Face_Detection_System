import face_recognition
import numpy as np
import cv2

def encode_face(image_path):
    """Extract face encoding from an image"""
    image = face_recognition.load_image_file(image_path)
    face_encodings = face_recognition.face_encodings(image)

    if len(face_encodings) == 0:
        raise ValueError("No face found in the image!")

    return face_encodings[0]
