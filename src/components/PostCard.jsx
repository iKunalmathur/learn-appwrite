/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-200 shadow rounded-md p-4">
        <img src={featuredImage} alt={title} className="w-full rounded-md" />
        <h3 className="text-lg font-semibold mt-4">{title}</h3>
      </div>
    </Link>
  )
}
