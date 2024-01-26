/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useId } from 'react'

function Select({ label, options = [], className, ...props }, ref) {
  const id = useId()
  return (
    <div className="w-full">
      {/* Label */}
      <label className="text-sm inline-block" htmlFor={id}>
        {label}
      </label>
      {/* Select */}
      <select
        id={id}
        className={`w-full px-4 py-2 rounded-lg border ${className}`}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
