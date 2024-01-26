/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef(
  ({ label, type = 'text', name, placeholder, value, className, ...props }, ref) => {
    const id = useId()
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="text-sm inline-block" htmlFor={id}>
            {label}
          </label>
        )}
        {/* Input */}
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          className={`w-full px-4 py-2 rounded-lg border ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

export default Input
