from fastapi import FastAPI  # type: ignore[import]
from fastapi.middleware.cors import CORSMiddleware  # type: ignore[import]
import json
import sqlite3
from database import get_connection

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
    connection = get_connection()

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM activity ORDER BY id DESC")

    rows = cursor.fetchall()
    connection.close()

    return [dict(row) for row in rows]