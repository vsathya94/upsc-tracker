// src/components/SubmitButton.tsx
import React from 'react';

interface SubmitButtonProps {
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  return (
    <button
      onClick={onSubmit}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
