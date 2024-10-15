import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'posts.json');

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  subcategory: string;
  date: string;
}

class PostManager {
  private posts: Post[] = [];
  private lastSync: number = 0;

  constructor() {
    this.loadPosts();
  }

  private loadPosts() {
    try {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      this.posts = JSON.parse(fileContents).posts;
      this.lastSync = Date.now();
    } catch (error) {
      console.error('Error loading posts:', error);
      this.posts = [];
    }
  }

  private savePosts() {
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify({ posts: this.posts }, null, 2));
      this.lastSync = Date.now();
    } catch (error) {
      console.error('Error saving posts:', error);
    }
  }

  getPosts(): Post[] {
    return this.posts;
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.savePosts();
  }

  updatePost(updatedPost: Post) {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
      this.savePosts();
    }
  }

  deletePost(id: string) {
    this.posts = this.posts.filter(post => post.id !== id);
    this.savePosts();
  }

  syncIfNeeded() {
    const currentTime = Date.now();
    if (currentTime - this.lastSync > 60000) { // Sync every minute
      this.loadPosts();
    }
  }
}

const postManager = new PostManager();
export default postManager;
