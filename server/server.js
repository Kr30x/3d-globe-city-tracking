const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Database setup
let db;

async function setupDatabase() {
  // Open the database
  db = await open({
    filename: 'cities.db',
    driver: sqlite3.Database
  });

  // Create the cities table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT,
      city TEXT,
      accentCity TEXT,
      region TEXT,
      population INTEGER,
      latitude REAL,
      longitude REAL
    )
  `);

  // Check if the table is empty
  const count = await db.get('SELECT COUNT(*) as count FROM cities');
  if (count.count === 0) {
    console.log('Cities table is empty. Loading data from CSV...');
    await loadCitiesFromCSV();
  } else {
    console.log(`Cities table already contains ${count.count} records.`);
  }
}

async function loadCitiesFromCSV() {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, 'cities.csv');
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', async (row) => {
        await db.run(`
          INSERT INTO cities (country, city, accentCity, region, population, latitude, longitude)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [row.Country, row.City, row.AccentCity, row.Region, row.Population, row.Latitude, row.Longitude]);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', reject);
  });
}

app.get('/api/search-locations', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const cities = await db.all(`
      SELECT city, country, population, latitude, longitude
      FROM cities
      WHERE (city LIKE ? OR country LIKE ?)
        AND population IS NOT NULL
        AND population != ''
      ORDER BY CAST(population AS INTEGER) DESC
      LIMIT 5
    `, [`%${q}%`, `%${q}%`]);

    // Format the population
    const formattedCities = cities.map(city => ({
      ...city,
      population: parseInt(city.population).toLocaleString(),
      lat: city.latitude,
      lng: city.longitude
    }));

    console.log('Found cities:', formattedCities);
    res.json(formattedCities || []); // Ensure we always return an array
  } catch (error) {
    console.error('Error searching cities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

setupDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(console.error);