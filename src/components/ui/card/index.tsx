// src/components/ui/card/index.tsx
import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};