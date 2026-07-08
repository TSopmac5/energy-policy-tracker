from fastapi import APIRouter
from database import get_connection

router = APIRouter()

@router.get("/stats")
def get_stats():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) FROM activity WHERE category = 'Federal'")
    federal_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM activity WHERE category = 'State'")
    state_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM activity WHERE category = 'Utility'")
    utility_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM activity WHERE category = 'Project'")
    project_count = cursor.fetchone()[0]

    connection.close()

    return {
        "federal_policies": federal_count,
        "state_policies": state_count,
        "utilities": utility_count,
        "projects": project_count,
    }