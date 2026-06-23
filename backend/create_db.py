import sqlite3

connection = sqlite3.connect("../database/energy_policy.db")

cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agency TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT,
    source_url TEXT,
    summary TEXT
)
""")

cursor.execute("""
INSERT INTO activity (agency, title, category, date, source_url, summary)
VALUES
('DOE', 'Grid Resilience Grant Program Announced', 'Federal', '2026-06-22', '', 'Placeholder federal energy policy update.'),
('FERC', 'Transmission Planning Rule Under Review', 'Federal', '2026-06-22', '', 'Placeholder transmission policy update.'),
('CPUC', 'California Utility Rate Case Hearing Scheduled', 'State', '2026-06-22', '', 'Placeholder state utility commission update.')
""")

connection.commit()
connection.close()

print("Database created successfully.")