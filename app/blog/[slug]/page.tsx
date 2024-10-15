import React from 'react';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  subcategory: string;
  date: string;
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

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { posts } = readPostsFile();
  const post = posts.find((p: Post) => p.slug === params.slug && p.category === 'Blog');

  if (!post) {
    console.log('Post not found:', params.slug);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title || 'Untitled'}</h1>
      <p className="text-gray-600 mb-4">Date: {new Date(post.date).toLocaleDateString()}</p>
      {post.subcategory && (
        <p className="text-gray-600 mb-4">Subcategory: {post.subcategory}</p>
      )}
      {post.content ? (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      ) : (
        <p>No content available</p>
      )}
      {post.images && post.images.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Images:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {post.images.map((image, index) => (
              <div key={index} className="relative w-full h-64">
                <Image 
                  src={image.url} 
                  alt={`Image ${index + 1}`} 
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}