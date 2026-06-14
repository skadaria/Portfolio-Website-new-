import { useState, useEffect } from 'react'
import type { BlogPost } from '@/data/portfolio'
import { getBlogPosts } from '@/lib/blogDataManager'

export default function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPosts()
      .then(data => {
        if (data) setPosts(data)
      })
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading }
}
