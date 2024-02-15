import { useEffect, useState } from 'react'
import databaseService from '../appwrite/databaseService'
import bucketService from '../appwrite/bucketService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser';

export default function Post() {
  const [ post, setPost ] = useState()
  const { slug } = useParams();
  const navigate = useNavigate()
  const authUser = useSelector((state) => state.auth.userData)
  const isAuthor = post && authUser ? post.userId === authUser.$id : false

  const deletePost = async () => {
    if (post) {
      const res = await databaseService.deletePost(post.$id)
      if (res.status && post?.image) {
        await bucketService.deleteFile(post.image)
      }
      navigate('/')
    }
  }

  useEffect(() => {
    if (!authUser) {
      navigate('/login')
    }
  }, [ authUser, navigate ])

  useEffect(() => {
    if (slug) {
      const getPost = async () => {
        const post = await databaseService.getPost(slug)
        if (!post) {
          navigate('/')
        }
        setPost(post)
      }
      getPost()
    }
  }, [ slug, navigate ])

  return post ? (
    <div>
      <div className="w-full bg-gray-200 shadow rounded-md p-4">
        <img src={bucketService.getFilePreview(post?.image)} alt={post?.title} className="w-full" />
        <h3 className="text-lg font-semibold mt-4">{post?.title}</h3>
        <article>
          {parse(post?.content)}
        </article>
      </div>
      {isAuthor && (
        <div className="flex gap-4 justify-center mt-4">
          <Link to={`/edit-post/${post.$id}`}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={deletePost}>Delete</Button>
        </div>
      )}
    </div>
  ) : null
}
