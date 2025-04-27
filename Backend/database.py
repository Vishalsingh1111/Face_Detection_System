from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Get the MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["face_db"]
users_collection = db["users"]
admins_collection = db["admins"]












# step to start the backend

#  source venv/bin/activate
# python app.py
