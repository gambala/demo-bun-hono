import { Database } from 'bun:sqlite';

export interface Item {
  id: number;
  name: string;
  price: number;
}

interface CountResult {
  count: number;
}

interface AvgResult {
  avg: number;
}

const db = new Database('db.sqlite3');

// Initialize database if needed
function initDatabase() {
  const tableExists = db.query(`
    SELECT name FROM sqlite_master
    WHERE type='table' AND name='items'
  `).get();

  if (!tableExists) {
    // Create table
    db.query(`
      CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        price REAL NOT NULL
      )
    `).run();

    // Insert sample data
    const insert = db.prepare('INSERT INTO items (name, price) VALUES (?, ?)');
    for (let i = 0; i < 1000; i++) {
      insert.run(`item_${i}`, Math.random() * 100);
    }
  }
}

initDatabase();

export const getRandomItems = (): Item[] => {
  return db.query(`
    SELECT * FROM items
    ORDER BY RANDOM()
    LIMIT 5
  `).all() as Item[];
};

export const getItemsCount = (): number => {
  return (db.query('SELECT COUNT(*) as count FROM items').get() as CountResult).count;
};

export const getAveragePrice = (): number => {
  return (db.query('SELECT AVG(price) as avg FROM items').get() as AvgResult).avg;
};

export default db;
