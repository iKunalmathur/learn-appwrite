/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full bg-gray-200 shadow rounded-md p-4">
        <img src={post.image} alt={post.title} className="w-full rounded-md" />
        <h3 className="text-lg font-semibold mt-4">{post.title}</h3>
      </div>
    </Link>
  )
}
