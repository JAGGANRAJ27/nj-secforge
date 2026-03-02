const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  else console.log("✅ SQLite connected");
});

module.exports = db;

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      role TEXT,
      lab TEXT
    )
  `);

  db.run(`
    INSERT INTO users (username,password,role)
    SELECT 'admin','admin123','admin'
    WHERE NOT EXISTS (
      SELECT 1 FROM users WHERE username='admin'
    )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    lab TEXT,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
});