from fastapi import APIRouter
from database import get_connection

router = APIRouter()

@router.get("/federal/activity")
def get_federal_activity():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT * FROM activity
        WHERE category = 'Federal'
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()
    connection.close()

    return [dict(row) for row in rows]