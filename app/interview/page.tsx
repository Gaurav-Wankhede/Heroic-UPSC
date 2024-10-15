'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { categories } from '@/lib/categories';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  subcategory: string;
  date: string;
}

export default function InterviewPage() {
  const interviewCategory = categories.find(cat => cat.name === 'Interview');
  const [allRecentPosts, setAllRecentPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/posts?category=Interview');
      const posts = await response.json();
      setAllRecentPosts(posts);
    }
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allRecentPosts
    .filter(post => post.category === 'Interview')
    .slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(allRecentPosts.filter(post => post.category === 'Interview').length / postsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">UPSC Interview</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Interview Preparation</h2>
        <ul className="list-disc pl-5 space-y-2">
          {interviewCategory?.subcategories?.map((subcat, index) => (
            <li key={index}>{typeof subcat === 'string' ? subcat : subcat.name}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recent Interview Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post: Post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4" dangerouslySetInnerHTML={{ __html: post.content ? post.content.substring(0, 150) + '...' : 'No content available' }} />
                <Link href={`/interview/${post.slug}`} className="text-primary hover:underline">
                  Read more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}