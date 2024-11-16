// src/components/ui/input/index.tsx
'use client';

import * as React from 'react';

// Modified InputProps to include a meaningful placeholder or additional properties if needed
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Adding a placeholder property to indicate this can be extended further
  customPlaceholder?: string;
}

export function Input({ customPlaceholder, ...props }: InputProps) {
  return (
    <input
      {...props}
      placeholder={customPlaceholder || props.placeholder} // Use the custom placeholder if provided
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ''}`}
    />
  );
}

Input.displayName = "Input";

// Make sure there's a default export as well
export default Input;
