from database import get_connection

connection = get_connection()
cursor = connection.cursor()

cursor.execute("""
INSERT INTO activity (agency, title, category, date, source_url, summary)
VALUES (?, ?, ?, ?, ?, ?)
""", (
    "NRC",
    "Small Modular Reactor Licensing Update",
    "Federal",
    "2026-06-22",
    "",
    "Placeholder update related to nuclear licensing."
))

connection.commit()
connection.close()

print("Activity record added.")