'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, BookOpen, Trash } from 'lucide-react';
import Streak from '@/components/streak';
import MainsAnswerTracker from '@/components/MainsAnswerTracker';
import ShareProgress from '@/components/ShareProgress';
import SubmitButton from '@/components/SubmitButton';

interface Category {
  name: string;
  target: number;
  current: number;
}

const UPSCTracker = () => {
  // State declarations
  const [hydrated, setHydrated] = useState(false); // To track hydration
  const [userName, setUserName] = useState('');
  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', target: 5 });
  const [mainsAnswers, setMainsAnswers] = useState({ target: 2, current: 0 });
  const [streak, setStreak] = useState(0);

  // Ensure the component is hydrated before rendering any client-only code
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load saved data from localStorage
      const savedCategories = localStorage.getItem('upscCategories');
      const savedMains = localStorage.getItem('upscMains');
      const savedStreak = localStorage.getItem('upscStreak');

      if (savedCategories) setCategories(JSON.parse(savedCategories));
      if (savedMains) setMainsAnswers(JSON.parse(savedMains));
      if (savedStreak) setStreak(JSON.parse(savedStreak));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && hydrated) {
      // Save data to localStorage
      localStorage.setItem('upscCategories', JSON.stringify(categories));
      localStorage.setItem('upscMains', JSON.stringify(mainsAnswers));
      localStorage.setItem('upscStreak', JSON.stringify(streak));
    }
  }, [categories, mainsAnswers, streak, hydrated]);

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, { ...newCategory, current: 0 }]);
      setNewCategory({ name: '', target: 5 });
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = (index: number) => {
    setCategories(categories.filter((_, idx) => idx !== index));
  };

  // Update count for MCQs
  const updateCount = (index: number, delta: number) => {
    const newCategories = [...categories];
    newCategories[index].current = Math.max(0, newCategories[index].current + delta);
    setCategories(newCategories);
  };

  // Update mains answers
  const updateMainsAnswers = (delta: number) => {
    setMainsAnswers(prev => ({
      ...prev,
      current: Math.max(0, prev.current + delta)
    }));
  };

  // Handle submitting the data (could be expanded to save to a backend)
  const handleSubmit = () => {
    // Handle submit logic - could be saving to a server or updating a persistent store
    alert("Progress submitted!");
  };

  // Text to be shared
  const progressText = `
    🎯 My UPSC Prep Today:
    MCQs: ${categories.map(c => `${c.name}: ${c.current}/${c.target}`).join(', ')}
    ✍️ Mains Answers: ${mainsAnswers.current}/${mainsAnswers.target}
    🔥 Streak: ${streak} days
    #UPSC #UPSCPreparation
  `;

  // Render the component only when hydrated to avoid SSR mismatch issues
  if (!hydrated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* User and Date Section */}
      <Card className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <span>UPSC Prep Tracker</span>
              <Streak streak={streak} />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* MCQ Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                MCQ Progress
              </h3>
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between gap-4 border-b pb-2">
                  <div className="flex-1">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-gray-500">Target: {category.target}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={() => updateCount(index, -1)}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{category.current}</span>
                    <Button onClick={() => updateCount(index, 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleDeleteCategory(index)}>
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add New Category */}
              <div className="flex gap-2">
                <Input
                  placeholder="New category name"
                  value={newCategory.name}
                  onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Target"
                  className="w-20"
                  value={newCategory.target}
                  onChange={e => setNewCategory({ ...newCategory, target: parseInt(e.target.value) })}
                />
                <Button onClick={handleAddCategory}>Add</Button>
              </div>
            </div>

            {/* Mains Answer Tracker */}
            <MainsAnswerTracker mainsAnswers={mainsAnswers} updateMainsAnswers={updateMainsAnswers} />

            {/* Share Progress */}
            <ShareProgress progressText={progressText} />

            {/* Submit Button */}
            <SubmitButton onSubmit={handleSubmit} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UPSCTracker;
