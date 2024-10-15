import React from 'react';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

interface Post {
  id: string;
  category: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  images: { url: string }[];
}

const dbPath = path.join(process.cwd(), 'db.json');

function readPostsFile(): { posts: Post[] } {
  try {
    const fileContents = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading posts file:', error);
    return { posts: [] };
  }
}

export default function MainsPost({ params }: { params: { slug: string } }) {
  const { posts } = readPostsFile();
  const post = posts.find((p: Post) => p.slug === params.slug && p.category === 'Mains');

  if (!post) {
    console.log('Post not found:', params.slug);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title || 'Untitled'}</h1>
      <p className="text-gray-600 mb-4">Date: {new Date(post.date).toLocaleDateString()}</p>
      {post.content ? (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
}