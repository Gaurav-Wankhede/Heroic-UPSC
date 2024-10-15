import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Database } from 'sqlite';
import fs from 'fs/promises';
import path from 'path';

const dbPath = './mydb.sqlite';
const jsonPath = path.join(process.cwd(), 'db.json');

let db: Database | null = null;

async function openDb(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    await db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT,
        slug TEXT,
        content TEXT,
        category TEXT,
        subcategory TEXT,
        subSubcategory TEXT,
        date TEXT
      )
    `);
  }
  return db;
}

async function syncJsonToDb() {
  const jsonData = await fs.readFile(jsonPath, 'utf-8');
  const { posts } = JSON.parse(jsonData);
  const db = await openDb();

  await db.run('BEGIN TRANSACTION');
  try {
    await db.run('DELETE FROM posts');
    for (const post of posts) {
      await db.run(
        'INSERT INTO posts (id, title, slug, content, category, subcategory, subSubcategory, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [post.id, post.title, post.slug, post.content, post.category, post.subcategory, post.subSubcategory || '', post.date]
      );
    }
    await db.run('COMMIT');
  } catch (error) {
    await db.run('ROLLBACK');
    throw error;
  }
}

async function syncDbToJson() {
  const db = await openDb();
  const posts = await db.all('SELECT * FROM posts');
  const jsonData = JSON.stringify({ posts }, null, 2);
  await fs.writeFile(jsonPath, jsonData);
}

export async function getPosts(category?: string) {
  await syncJsonToDb();
  const db = await openDb();
  if (category) {
    return db.all('SELECT * FROM posts WHERE category = ? ORDER BY date DESC', category);
  }
  return db.all('SELECT * FROM posts ORDER BY date DESC');
}

export async function createPost(post: any) {
  await syncJsonToDb();
  const db = await openDb();
  const { title, content, category, subcategory, subSubcategory, date } = post;
  const id = Math.floor(Math.random() * 10000).toString();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  await db.run(
    'INSERT INTO posts (id, title, slug, content, category, subcategory, subSubcategory, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, title, slug, content, category, subcategory, subSubcategory || '', date]
  );
  await syncDbToJson();
  return { id, title, slug, content, category, subcategory, subSubcategory, date };
}

export async function updatePost(post: any) {
  await syncJsonToDb();
  const db = await openDb();
  const { id, title, content, category, subcategory, subSubcategory, date } = post;
  await db.run(
    'UPDATE posts SET title = ?, content = ?, category = ?, subcategory = ?, subSubcategory = ?, date = ? WHERE id = ?',
    [title, content, category, subcategory, subSubcategory || '', date, id]
  );
  await syncDbToJson();
  return post;
}

export async function deletePost(id: string) {
  await syncJsonToDb();
  const db = await openDb();
  await db.run('DELETE FROM posts WHERE id = ?', id);
  await syncDbToJson();
}

