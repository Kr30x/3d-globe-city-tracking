import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    # List to store the data
    data = []

    # Read the CSV file
    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        # Convert each row to a dictionary and append to the data list
        for row in csv_reader:
            data.append({
                'Country': row['Country'],
                'City': row['City'],
                'AccentCity': row['AccentCity'],
                'Region': row['Region'],
                'Population': float(row['Population']) if row['Population'] else None,
                'Latitude': float(row['Latitude']) if row['Latitude'] else None,
                'Longitude': float(row['Longitude']) if row['Longitude'] else None
            })

    # Write the data to a JSON file
    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=2)

    print(f"Conversion complete. JSON data saved to {json_file_path}")

# Use the function
csv_to_json('cities.csv', 'cities.json')