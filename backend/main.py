from fastapi import FastAPI  # type: ignore[import]
from fastapi.middleware.cors import CORSMiddleware  # type: ignore[import]
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Energy Policy Tracker API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/activity")
def get_activity():
    with open("data/activity.json", "r") as file:
        return json.load(file)