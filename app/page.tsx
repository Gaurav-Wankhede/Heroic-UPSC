import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import fs from 'fs'
import path from 'path'
import dynamic from "next/dynamic"
import AdBanner from "@/components/AdBanner"

const dataFilePath = path.join(process.cwd(), 'db.json')

function readPostsFile() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8')
  return JSON.parse(fileContents)
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  date: string;
}

function getRecentPosts(category: string, count: number): Post[] {
  const { posts } = readPostsFile()
  return posts
    .filter((post: Post) => post.category === category)
    .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

function randomQuote(): string {
  const quotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "In the middle of every difficulty lies opportunity. - Albert Einstein",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function Home() {
  const quote = randomQuote()
  const recentPrelims = getRecentPosts('Prelims', 3)
  const recentMains = getRecentPosts('Mains', 3)
  const recentInterview = getRecentPosts('Interview', 3)
  const recentBlog = getRecentPosts('Blog', 3)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 bg-blue-500">
        <AdBanner
          dataAdSlot="3700346596"
        dataAdFormat="auto"
          dataFullWidthResponsive={true}
        />
      </div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Heroic UPSC</h1>
        <p className="text-xl">
          Your comprehensive resource for UPSC exam preparation. We provide high-quality content
          for Prelims, Mains, and Interview stages to help you succeed in your UPSC journey.
        </p>
      </section>

      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Quote of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic">{quote}</p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RecentPostsSection title="Prelims" posts={recentPrelims} />
          <RecentPostsSection title="Mains" posts={recentMains} />
          <RecentPostsSection title="Interview" posts={recentInterview} />
          <RecentPostsSection title="Blog" posts={recentBlog} />
        </div>
      </section>
    </div>
  )
}

interface RecentPostsSectionProps {
  title: string;
  posts: Post[];
}

function RecentPostsSection({ title, posts }: RecentPostsSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {posts.slice(0, 3).map((post) => (
        <Card key={post.id} className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 97) + '...' }} />
            <Link href={`/${title.toLowerCase()}/${post.slug}`} className="text-primary hover:underline text-sm">
              Read more
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })