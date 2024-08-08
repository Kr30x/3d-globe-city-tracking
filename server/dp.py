import csv
import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('cities.db')
cursor = conn.cursor()

# Create table
cursor.execute('''
CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country TEXT,
    city TEXT,
    accent_city TEXT,
    region TEXT,
    population INTEGER,
    latitude REAL,
    longitude REAL
)
''')

# Read CSV file and insert data into the database
with open('cities.csv', 'r', encoding='utf-8') as csvfile:
    csvreader = csv.reader(csvfile)
    next(csvreader)  # Skip the header row
    for row in csvreader:
        cursor.execute('''
        INSERT INTO cities (country, city, accent_city, region, population, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', row)

# Commit changes and close connection
conn.commit()
conn.close()

print("Data has been successfully imported into the SQLite database.")