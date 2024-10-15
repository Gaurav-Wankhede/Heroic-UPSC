import { openDb } from '../lib/db';

async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      category TEXT,
      subcategory TEXT,
      subSubcategory TEXT,
      date TEXT,
      slug TEXT
    )
  `);
  console.log('Database initialized');
}

initDb().catch(console.error);

