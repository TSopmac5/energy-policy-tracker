from database import get_connection

connection = get_connection()
cursor = connection.cursor()

cursor.execute("DELETE FROM activity WHERE id = ?", (4,))

connection.commit()
connection.close()

print("Duplicate activity record deleted.")