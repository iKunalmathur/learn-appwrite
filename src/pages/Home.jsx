import { useEffect, useState } from 'react'
import databaseService from '../appwrite/databaseService'
import PostCard from '../components/PostCard'

export default function Home() {
  const [ posts, setPosts ] = useState([])

  const getPosts = async () => {
    const posts = await databaseService.getPosts()
    console.log(posts);
    if (posts.documents.length > 0) {
      setPosts(posts.documents)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return <>
    <h1>Home</h1>
    <div>
      {
        posts.length > 0 ? <div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              posts.map(post => (
                <div key={post.$id} className='w-full p-2'>
                  <PostCard post={post} />
                </div>
              ))
            }
          </div>
        </div> : <div className="w-full p-2">No posts yet</div>
      }
    </div>
  </>
}
