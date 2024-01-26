/* eslint-disable react/prop-types */
export default function Button({ children, onClick, type, className, ...props }) {
  return (
    <Button
      {...props}
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${className}`}
    >
      {children}
    </Button>
  )
}
