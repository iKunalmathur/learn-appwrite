import { useEffect, useState } from 'react'
import databaseService from '../appwrite/databaseService'
import PostCard from '../components/PostCard'

export default function AllPost() {
  const [ posts, setPosts ] = useState([])

  const getPosts = async () => {
    const posts = await databaseService.getPosts()
    setPosts(posts.documents)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {
      posts.map(post => (
        <div key={post.$id} className='w-full p-2'>
          <PostCard post={post} />
        </div>
      ))
    }
  </div>
}
