from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo import MongoClient
import os
import logging
from pathlib import Path
from typing import List
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'lucas-portfolio-cluster')
client = MongoClient(mongo_url)
db = client[db_name]

# Create the main app
app = FastAPI(
    title="Lucas Portfolio API",
    description="API pour le portfolio de Lucas - Étudiant en Mécanique",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS configuration
cors_origins = os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(',')
cors_origins = [origin.strip() for origin in cors_origins]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple endpoints
@api_router.get("/")
def root():
    return {"message": "Lucas Portfolio API - Étudiant en Mécanique", "version": "1.0.0"}

@api_router.get("/health")
def health_check():
    return {"status": "healthy", "service": "lucas-portfolio-api"}

@api_router.post("/contact")
def send_contact_message(data: dict):
    try:
        message_obj = {
            "id": str(uuid.uuid4()),
            "name": data.get("name", ""),
            "email": data.get("email", ""),
            "subject": data.get("subject", ""),
            "message": data.get("message", ""),
            "timestamp": datetime.utcnow()
        }
        db.contact_messages.insert_one(message_obj)
        return {"status": "success", "message": "Message envoyé"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@api_router.get("/contact/messages")
def get_contact_messages():
    try:
        messages = list(db.contact_messages.find().sort("timestamp", -1).limit(100))
        # Convert ObjectId to string for JSON serialization
        for message in messages:
            message['_id'] = str(message['_id'])
        return messages
    except Exception as e:
        return {"error": str(e)}

@api_router.post("/games/score")
def save_game_score(data: dict):
    try:
        score_obj = {
            "id": str(uuid.uuid4()),
            "game_name": data.get("game_name", ""),
            "score": data.get("score", 0),
            "player_name": "Lucas",
            "timestamp": datetime.utcnow()
        }
        db.game_scores.insert_one(score_obj)
        return {"status": "success", "score": score_obj}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@api_router.get("/games/scores/{game_name}")
def get_game_scores(game_name: str):
    try:
        scores = list(db.game_scores.find({"game_name": game_name}).sort("score", -1).limit(10))
        # Convert ObjectId to string for JSON serialization
        for score in scores:
            score['_id'] = str(score['_id'])
        return scores
    except Exception as e:
        return {"error": str(e)}

@api_router.get("/games/leaderboard")
def get_leaderboard():
    try:
        # Simple leaderboard query
        games = ["snake", "tetris", "pong", "flappy", "breakout", "agar"]
        leaderboard = []
        
        for game in games:
            highest = db.game_scores.find_one({"game_name": game}, sort=[("score", -1)])
            if highest:
                highest['_id'] = str(highest['_id'])
                leaderboard.append(highest)
        
        return leaderboard
    except Exception as e:
        return {"error": str(e)}

# Include the router in the main app
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
def startup_event():
    logger.info("Lucas Portfolio API démarrant...")
    logger.info(f"Base de données: {db_name}")
    logger.info("Connexion MongoDB Atlas établie")
    logger.info(f"CORS Origins: {cors_origins}")

@app.on_event("shutdown")
def shutdown_db_client():
    client.close()
    logger.info("Connexion à la base de données fermée")

# Root endpoint
@app.get("/")
def root_endpoint():
    return {"message": "Lucas Portfolio API", "docs": "/docs", "api": "/api"}