import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../appwrite/databaseService';
import PostForm from '../components/PostForm';

export default function EditPost() {
  const [ post, setPost ] = useState();
  const { slug } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      const getPost = async () => {
        const post = await databaseService.getPost(slug)
        if (!post) {
          navigate('/')
        }
        console.log(post);
        setPost(post)
      }
      getPost()
    }
  }, [ slug, navigate ])

  return <div>
    <PostForm post={post} />
  </div>
}
