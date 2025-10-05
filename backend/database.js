const sqlite3 = require("sqlite3").verbose()

const DB_PATH = "./weather_cache.db"

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error opening database", err.message)
  } else {
    console.log("Connected to the SQLite cache database.")
    db.run(
      `CREATE TABLE IF NOT EXISTS cache (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lat REAL NOT NULL,
      lon REAL NOT NULL,
      day_of_year INTEGER NOT NULL,
      result TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
      (err) => {
        if (err) {
          console.error("Error creating table", err.message)
        }
      },
    )
  }
})

module.exports = db
