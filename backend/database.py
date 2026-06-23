import sqlite3

def get_connection():
    connection = sqlite3.connect("../database/energy_policy.db")
    connection.row_factory = sqlite3.Row
    return connection