/* eslint-disable react/prop-types */
export default function Button({ children, type = "button", className, ...props }) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded bg-gray-900 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
