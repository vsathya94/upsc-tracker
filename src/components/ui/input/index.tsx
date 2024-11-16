// src/components/ui/input/index.tsx
'use client';

import * as React from 'react';

// Modified InputProps to include an additional property
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customPlaceholder?: string; // This makes the interface more meaningful
}

export function Input({ customPlaceholder, ...props }: InputProps) {
  return (
    <input
      {...props}
      placeholder={customPlaceholder || props.placeholder}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ''}`}
    />
  );
}

Input.displayName = "Input";

// Make sure there's a default export as well
export default Input;
