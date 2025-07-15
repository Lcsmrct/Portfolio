from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (synchrone au lieu d'async pour éviter motor)
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'lucas-portfolio-cluster')
client = MongoClient(mongo_url)
db = client[db_name]

# Create the main app without a prefix
app = FastAPI(
    title="Lucas Portfolio API",
    description="API pour le portfolio de Lucas - Étudiant en Mécanique",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS configuration for production
cors_origins = os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(',')
cors_origins = [origin.strip() for origin in cors_origins]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class GameScore(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    game_name: str
    score: int
    player_name: str = "Lucas"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class GameScoreCreate(BaseModel):
    game_name: str
    score: int

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
def root():
    return {"message": "Lucas Portfolio API - Étudiant en Mécanique", "version": "1.0.0"}

@api_router.post("/status", response_model=StatusCheck)
def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
def get_status_checks():
    status_checks = list(db.status_checks.find().limit(1000))
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/games/score", response_model=GameScore)
def save_game_score(input: GameScoreCreate):
    score_dict = input.dict()
    score_obj = GameScore(**score_dict)
    db.game_scores.insert_one(score_obj.dict())
    return score_obj

@api_router.get("/games/scores/{game_name}")
def get_game_scores(game_name: str):
    scores = list(db.game_scores.find({"game_name": game_name}).sort("score", -1).limit(10))
    return [GameScore(**score) for score in scores]

@api_router.get("/games/leaderboard")
def get_leaderboard():
    # Get highest score for each game
    pipeline = [
        {"$group": {
            "_id": "$game_name",
            "highest_score": {"$max": "$score"},
            "player_name": {"$first": "$player_name"},
            "timestamp": {"$first": "$timestamp"}
        }}
    ]
    leaderboard = list(db.game_scores.aggregate(pipeline))
    return leaderboard

@api_router.post("/contact", response_model=ContactMessage)
def send_contact_message(input: ContactMessageCreate):
    message_dict = input.dict()
    message_obj = ContactMessage(**message_dict)
    db.contact_messages.insert_one(message_obj.dict())
    return message_obj

@api_router.get("/contact/messages")
def get_contact_messages():
    messages = list(db.contact_messages.find().sort("timestamp", -1).limit(100))
    return [ContactMessage(**message) for message in messages]

# Health check endpoint
@api_router.get("/health")
def health_check():
    return {"status": "healthy", "service": "lucas-portfolio-api"}

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