import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Database } from 'sqlite';

let db: Database | null = null;

export async function openDb(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: './mydb.sqlite',
      driver: sqlite3.Database
    });
  }
  return db as Database;
}

export async function getPosts() {
  const db = await openDb();
  return db.all('SELECT * FROM posts ORDER BY date DESC');
}

export async function createPost(post: any) {
  const db = await openDb();
  const { title, content, category, subcategory, subSubcategory, date } = post;
  return db.run(
    'INSERT INTO posts (title, content, category, subcategory, subSubcategory, date) VALUES (?, ?, ?, ?, ?, ?)',
    [title, content, category, subcategory, subSubcategory, date]
  );
}

export async function updatePost(post: any) {
  const db = await openDb();
  const { id, title, content, category, subcategory, subSubcategory, date } = post;
  return db.run(
    'UPDATE posts SET title = ?, content = ?, category = ?, subcategory = ?, subSubcategory = ?, date = ? WHERE id = ?',
    [title, content, category, subcategory, subSubcategory, date, id]
  );
}

export async function deletePost(id: string) {
  const db = await openDb();
  return db.run('DELETE FROM posts WHERE id = ?', id);
}
