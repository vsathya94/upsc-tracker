// src/components/ui/input/index.tsx
'use client';

import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ''}`}
    />
  );
}

Input.displayName = "Input";

// Make sure there's a default export as well
export default Input;