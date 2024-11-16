// src/components/Streak.tsx
import React from 'react';

interface StreakProps {
  streak: number;
}

const Streak: React.FC<StreakProps> = ({ streak }) => (
  <div className="flex items-center gap-2">
    <span role="img" aria-label="flame">🔥</span>
    <span>{streak} day streak</span>
  </div>
);

export default Streak;
