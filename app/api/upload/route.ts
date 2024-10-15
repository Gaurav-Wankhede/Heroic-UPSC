import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import slugify from 'slugify';

const assetsDir = join(process.cwd(), 'public', 'data', 'assets');
const dbPath = join(process.cwd(), 'db.json');

function readDb() {
  const data = readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

function writeDb(data: any) {
  writeFileSync(dbPath, JSON.stringify(data, null, 2));
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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const subcategory = formData.get('subcategory') as string;
    const image = formData.get('image') as File | null;

    let imageUrl = '';
    if (image) {
      // Ensure the assets directory exists
      if (!existsSync(assetsDir)) {
        await mkdir(assetsDir, { recursive: true });
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = image.name.replaceAll(' ', '_');
      const filePath = join(assetsDir, filename);

      await writeFile(filePath, buffer);
      imageUrl = `/data/assets/${filename}`;
    }

    const db = readDb();
    const newPost = {
      id: (db.posts.length + 1).toString(),
      title,
      slug: generateSlug(title, category, db.posts),
      content,
      category,
      subcategory,
      date: new Date().toISOString(),
      images: imageUrl ? [{ url: imageUrl }] : []
    };

    // Add new post to the array
    db.posts.push(newPost);
    writeDb(db);

    return NextResponse.json({ success: true, data: newPost });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}