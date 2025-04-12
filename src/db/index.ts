import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { items } from './schema';
import { avg, count, sql } from 'drizzle-orm';

export interface Item {
  id: number;
  name: string;
  price: number;
}

const sqlite = new Database('db.sqlite3');
const db = drizzle(sqlite);

// Initialize database if needed
async function initDatabase() {
  const tableExists = sqlite.query(`
    SELECT name FROM sqlite_master
    WHERE type='table' AND name='items'
  `).get();

  if (!tableExists) {
    // Create table
    await db.run(sql`
      CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        price REAL NOT NULL
      )
    `);

    // Insert sample data
    const values = Array.from({ length: 1000 }, (_, i) => ({
      name: `item_${i}`,
      price: Math.random() * 100
    }));

    await db.insert(items).values(values);
  }
}

initDatabase();

export const getRandomItems = async (): Promise<Item[]> => {
  return await db.select()
    .from(items)
    .orderBy(sql`RANDOM()`)
    .limit(5);
};

export const getItemsCount = async (): Promise<number> => {
  const result = await db.select({ count: count() })
    .from(items);
  return result[0].count;
};

export const getAveragePrice = async (): Promise<number> => {
  const result = await db.select({ avg: avg(items.price) })
    .from(items);
  return Number(result[0].avg) || 0;
};

export default db;
