// src/components/ShareProgress.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface ShareProgressProps {
  progressText: string;
}

const ShareProgress: React.FC<ShareProgressProps> = ({ progressText }) => {
  const shareProgress = () => {
    if (navigator.share) {
      navigator.share({ text: progressText });
    } else {
      navigator.clipboard.writeText(progressText);
      alert('Progress copied to clipboard!');
    }
  };

  return (
    <Button className="w-full" onClick={shareProgress}>
      <Share2 className="w-4 h-4 mr-2" />
      Share Progress
    </Button>
  );
};

export default ShareProgress;
