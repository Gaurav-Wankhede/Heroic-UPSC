import { NextResponse } from 'next/server'
import { auth } from "@clerk/nextjs/server";
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';

const dbPath = path.join(process.cwd(), 'db.json');

function readDb() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function generateSlug(title: string, category: string, posts: any[]): string {
  const baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (posts.some(post => post.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const db = readDb();
    let posts = db.posts;
    
    if (category) {
      posts = posts.filter((post: any) => post.category === category);
    }
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const post = await request.json();

  if (!post.title || !post.content || !post.category || !post.subcategory || !post.date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const db = readDb();
  post.id = (Math.random() * 10000).toFixed(0);
  post.slug = generateSlug(post.title, post.category, db.posts);
  db.posts.push(post);
  writeDb(db);

  return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedPost = await request.json();

  if (!updatedPost.id) {
    return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
  }

  const db = readDb();
  const index = db.posts.findIndex((p: any) => p.id === updatedPost.id);
  if (index !== -1) {
    db.posts[index] = updatedPost;
    writeDb(db);
    return NextResponse.json({ message: 'Post updated successfully' });
  }

  return NextResponse.json({ error: 'Post not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
  }

  const db = readDb();
  db.posts = db.posts.filter((p: any) => p.id !== id);
  writeDb(db);

  return NextResponse.json({ message: 'Post deleted successfully' });
}