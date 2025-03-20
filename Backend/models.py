from database import users_collection
import numpy as np
import face_recognition

def save_user(face_encoding, username):
    """Save user face encoding in database"""
    user_data = {
        "username": username,
        "encoding": face_encoding.tolist()
    }
    users_collection.insert_one(user_data)
    return {"message": "User registered successfully!"}

def find_matching_user(face_encoding):
    """Compare face encoding with stored users"""
    users = list(users_collection.find({}))

    for user in users:
        stored_encoding = np.array(user["encoding"])
        match = face_recognition.compare_faces([stored_encoding], face_encoding)
        if match[0]: 
            return {"matched": True, "username": user["username"]}

    return {"matched": False}

 