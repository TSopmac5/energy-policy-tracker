from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from database import get_connection

router = APIRouter()


class ActivityCreate(BaseModel):
    agency: str
    title: str
    category: str
    date: str | None = None
    source_url: str | None = None
    summary: str | None = None


@router.get("/activity")
def get_activity():
    connection = get_connection()

    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM activity ORDER BY id DESC")
        rows = cursor.fetchall()

        return [dict(row) for row in rows]
    finally:
        connection.close()


@router.post("/activity", status_code=status.HTTP_201_CREATED)
def create_activity(activity: ActivityCreate):
    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO activity (
                agency,
                title,
                category,
                date,
                source_url,
                summary
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                activity.agency,
                activity.title,
                activity.category,
                activity.date,
                activity.source_url,
                activity.summary,
            ),
        )

        connection.commit()
        new_activity_id = cursor.lastrowid

        cursor.execute(
            "SELECT * FROM activity WHERE id = ?",
            (new_activity_id,),
        )

        new_activity = cursor.fetchone()

        if new_activity is None:
            raise HTTPException(
                status_code=500,
                detail="The activity was added but could not be retrieved.",
            )

        return dict(new_activity)

    finally:
        connection.close()