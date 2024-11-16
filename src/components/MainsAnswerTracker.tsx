// src/components/MainsAnswerTracker.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface MainsAnswerTrackerProps {
  mainsAnswers: { target: number; current: number };
  updateMainsAnswers: (delta: number) => void;
}

const MainsAnswerTracker: React.FC<MainsAnswerTrackerProps> = ({ mainsAnswers, updateMainsAnswers }) => (
  <div className="space-y-2 border-b pb-4">
    <h4 className="font-medium">Mains Answers Written</h4>
    <div className="flex items-center gap-2">
      <Button onClick={() => updateMainsAnswers(-1)}>
        <Minus className="w-4 h-4" />
      </Button>
      <span className="w-8 text-center">{mainsAnswers.current}</span>
      <Button onClick={() => updateMainsAnswers(1)}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  </div>
);

export default MainsAnswerTracker;
