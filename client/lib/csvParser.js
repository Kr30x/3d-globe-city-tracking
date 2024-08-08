import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function parseCitiesCSV() {
  const filePath = path.join(process.cwd(), 'cities.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  return records.map(record => ({
    city: record.AccentCity,
    country: record.Country,
    population: parseInt(record.Population) || 0,
    latitude: parseFloat(record.Latitude),
    longitude: parseFloat(record.Longitude)
  })).sort((a, b) => b.population - a.population); // Sort by population, descending
}