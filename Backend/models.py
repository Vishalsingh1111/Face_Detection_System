from database import users_collection, admins_collection
import numpy as np
import face_recognition
import bcrypt

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

# ------------------ Admin Functions ------------------

def register_admin(email, password):
    """Register admin with hashed password"""
    if admins_collection.find_one({"email": email}):
        return {"error": "Admin already exists!"}

    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    admin_data = {
        "email": email,
        "password": hashed_pw
    }
    admins_collection.insert_one(admin_data)
    return {"message": "Admin registered successfully!"}

def login_admin(email, password):
    """Validate admin login"""
    admin = admins_collection.find_one({"email": email})
    if not admin:
        return {"error": "Admin not found!"}

    if bcrypt.checkpw(password.encode("utf-8"), admin["password"]):
        return {"message": "Login successful!", "email": email}
    else:
        return {"error": "Invalid password!"}

 