"use client"

import { useState, useEffect } from 'react'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { categories } from '@/lib/categories'
import RichTextEditor from '@/components/RichTextEditor'
import { toast } from '@/hooks/use-toast'
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { format, endOfDay, parse, isValid, startOfDay, isAfter, isBefore, isEqual } from "date-fns"
import { cn } from "@/lib/utils"

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  subcategory: string;
  subSubcategory: string;
  date: string;
  images?: { url: string }[];
}

const categoryStructure = categories.reduce((acc: { [key: string]: any }, category) => {
  acc[category.name] = category.subcategories.reduce((subAcc: { [key: string]: any }, subcategory) => {
    if (typeof subcategory === 'string') {
      subAcc[subcategory] = [];
    } else {
      subAcc[subcategory.name] = subcategory.subcategories;
    }
    return subAcc;
  }, {});
  return acc;
}, {});

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [confirmText, setConfirmText] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('')
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')
  const { register, handleSubmit, setValue, reset, control, watch } = useForm<FieldValues>()
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3

  const watchCategory = watch('category')
  const watchSubcategory = watch('subcategory')

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [searchInput, selectedCategory, selectedSubcategory, selectedSubSubcategory, dateFrom, dateTo, posts])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        const sortedPosts = data.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setPosts(sortedPosts)
        setFilteredPosts(sortedPosts)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const postData = {
        id: data.id, // Add this line to include the id when editing
        title: data.title,
        content: data.content,
        category: data.category,
        subcategory: data.subcategory,
        subSubcategory: data.subSubcategory,
        date: data.id ? data.date : new Date().toISOString(), // Keep original date when editing
        images: data.images ? [{ url: URL.createObjectURL(data.images[0]) }] : []
      };

      const method = data.id ? 'PUT' : 'POST';
      const response = await fetch('/api/posts', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${data.id ? 'update' : 'create'} post`);
      }

      await fetchPosts();

      toast({
        title: "Success",
        description: `Post ${data.id ? 'updated' : 'created'} successfully`,
      });
      reset();
    } catch (error) {
      console.error(`Error ${data.id ? 'updating' : 'creating'} post:`, error);
      toast({
        title: "Error",
        description: `Failed to ${data.id ? 'update' : 'create'} post. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id)
    setConfirmText('')
  }

  const confirmDelete = async () => {
    if (postToDelete && confirmText.toLowerCase() === 'confirm') {
      try {
        const response = await fetch(`/api/posts?id=${postToDelete}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setPosts(posts.filter(post => post.id !== postToDelete))
          setFilteredPosts(filteredPosts.filter(post => post.id !== postToDelete))
          toast({
            title: "Success",
            description: "Post deleted successfully",
          })
        } else {
          throw new Error('Failed to delete post')
        }
      } catch (error) {
        console.error('Error deleting post:', error)
        toast({
          title: "Error",
          description: "Failed to delete post. Please try again.",
          variant: "destructive",
        })
      } finally {
        setPostToDelete(null)
        setConfirmText('')
      }
    }
  }

  const parseDate = (dateString: string): Date | null => {
    const formats = ['dd-MMMM-yyyy', 'dd-MMM-yyyy', 'dd-MM-yyyy', 'd-M-yyyy', 'yyyy', 'MMMM-yyyy', 'MMM-yyyy', 'dd', 'DD', 'MM', 'MMM', 'MMMM'];
    for (const formatString of formats) {
      try {
        const parsedDate = parse(dateString, formatString, new Date());
        if (isValid(parsedDate)) {
          return parsedDate;
        }
      } catch {
        continue;
      }
    }
    return null;
  }

  const filterPosts = () => {
    let filtered = posts;

    if (searchInput) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        post.content.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (selectedSubcategory && selectedSubcategory !== 'all') {
      filtered = filtered.filter(post => post.subcategory === selectedSubcategory);
    }

    if (selectedSubSubcategory && selectedSubSubcategory !== 'all') {
      filtered = filtered.filter(post => post.subSubcategory === selectedSubSubcategory);
    }

    if (dateFrom || dateTo) {
      filtered = filtered.filter(post => {
        const postDate = new Date(post.date);
        let fromDate = dateFrom ? parseDate(dateFrom) : null;
        let toDate = dateTo ? parseDate(dateTo) : null;

        if (fromDate && !isValid(fromDate)) fromDate = null;
        if (toDate && !isValid(toDate)) toDate = null;

        if (fromDate && toDate) {
          return isAfter(postDate, startOfDay(fromDate)) && isBefore(postDate, endOfDay(toDate));
        } else if (fromDate) {
          return isAfter(postDate, startOfDay(fromDate)) || isEqual(postDate, startOfDay(fromDate));
        } else if (toDate) {
          return isBefore(postDate, endOfDay(toDate)) || isEqual(postDate, endOfDay(toDate));
        }

        return true;
      });
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }

  const clearFilters = () => {
    setSearchInput('')
    setSelectedCategory('')
    setSelectedSubcategory('')
    setSelectedSubSubcategory('')
    setDateFrom('')
    setDateTo('')
    setFilteredPosts(posts)
    setCurrentPage(1)
  }

  const handleEditClick = (id: string) => {
    const postToEdit = posts.find(post => post.id === id);
    if (postToEdit) {
      setValue('title', postToEdit.title);
      setValue('content', postToEdit.content);
      setValue('category', postToEdit.category);
      setValue('subcategory', postToEdit.subcategory);
      setValue('subSubcategory', postToEdit.subSubcategory);
      // Set other fields as necessary
    }
  }

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <Input {...register('title', { required: true })} placeholder="Title" className="mb-4" />
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <RichTextEditor {...field} />}
        />
        <Select onValueChange={(value) => {
          setValue('category', value)
          setValue('subcategory', '')
          setValue('subSubcategory', '')
        }}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(categoryStructure).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {watchCategory && typeof categoryStructure[watchCategory as keyof typeof categoryStructure] === 'object' && Object.keys(categoryStructure[watchCategory as keyof typeof categoryStructure]).length > 0 && (
          <Select onValueChange={(value) => {
            setValue('subcategory', value)
            setValue('subSubcategory', '')
          }}>
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(categoryStructure[watchCategory as keyof typeof categoryStructure]).map((subcategory) => (
                <SelectItem key={subcategory} value={subcategory}>
                  {subcategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {watchCategory && watchSubcategory && categoryStructure[watchCategory as keyof typeof categoryStructure][watchSubcategory as keyof (typeof categoryStructure)[keyof typeof categoryStructure]] && (
          <Select onValueChange={(value) => setValue('subSubcategory', value)}>
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Select sub-subcategory" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(categoryStructure[watchCategory as keyof typeof categoryStructure][watchSubcategory as keyof (typeof categoryStructure)[keyof typeof categoryStructure]]) &&
                (categoryStructure[watchCategory as keyof typeof categoryStructure][watchSubcategory as keyof (typeof categoryStructure)[keyof typeof categoryStructure]] as string[]).map((subSubcategory: string) => (
                  <SelectItem key={subSubcategory} value={subSubcategory}>
                    {subSubcategory}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
        <Input {...register('image')} type="file" accept="image/*" className="mb-4" />
        <Button type="submit">Create Post</Button>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <div className="mb-4 flex flex-wrap gap-4">
          <Input
            placeholder="Search posts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow w-[200px]"
          />
          <Select onValueChange={setSelectedCategory} value={selectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.keys(categoryStructure).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedCategory && selectedCategory !== 'all' && typeof categoryStructure[selectedCategory as keyof typeof categoryStructure] === 'object' && Object.keys(categoryStructure[selectedCategory as keyof typeof categoryStructure]).length > 0 && (
            <Select onValueChange={setSelectedSubcategory} value={selectedSubcategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subcategories</SelectItem>
                {Object.keys(categoryStructure[selectedCategory as keyof typeof categoryStructure]).map((subcategory) => (
                  <SelectItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {selectedCategory && selectedCategory !== 'all' && selectedSubcategory && selectedSubcategory !== 'all' && 
           Array.isArray(categoryStructure[selectedCategory as keyof typeof categoryStructure][selectedSubcategory as keyof (typeof categoryStructure)[keyof typeof categoryStructure]]) && (
            <Select onValueChange={setSelectedSubSubcategory} value={selectedSubSubcategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by sub-subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sub-subcategories</SelectItem>
                {(categoryStructure[selectedCategory as keyof typeof categoryStructure][selectedSubcategory as keyof (typeof categoryStructure)[keyof typeof categoryStructure]] as string[]).map((subSubcategory) => (
                  <SelectItem key={subSubcategory} value={subSubcategory}>
                    {subSubcategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Input
            placeholder="From Date (e.g., 12-August-2024)"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-[300px]"
          />
          <Input
            placeholder="To Date (e.g., 12-Aug-2024)"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-[300px]"
          />
          <Button onClick={clearFilters}>Clear</Button>
        </div>
        {currentPosts && currentPosts.length > 0 ? (
          <>
            {currentPosts.map((post) => (
              <div key={post.id} className="mb-8 p-4 border rounded">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <p>Category: {post.category}</p>
                <p>Subcategory: {post.subcategory}</p>
                <p>Sub-subcategory: {post.subSubcategory}</p>
                <p>Date: {new Date(post.date).toLocaleString()}</p>
                {post.images && post.images.length > 0 && (
                  <Image src={post.images[0].url} alt={post.title} width={500} height={300} className="mt-2 max-w-full h-auto" />
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="mt-4" onClick={() => handleDeleteClick(post.id)}>Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the post.
                        Type &ldquo;Confirm&rdquo; to delete this post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Input
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="Type 'Confirm' here"
                      className="mb-4"
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setPostToDelete(null)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={confirmDelete} disabled={confirmText.toLowerCase() !== 'confirm'}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={cn("mx-1", currentPage === i + 1 ? "bg-blue-500" : "bg-gray-200")}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}