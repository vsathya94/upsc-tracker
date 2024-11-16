// src/components/ui/card/index.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};