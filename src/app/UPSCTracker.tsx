'use client';

import React, { useState } from 'react'; 
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, BookOpen, Trash } from 'lucide-react'; 

interface Category {
  name: string;
  target: number;
  current: number;
}

const UPSCTracker = () => {
  const [userName, setUserName] = useState('');
  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('upscCategories') : null;
    return saved ? JSON.parse(saved) : [
      { name: 'Static MCQs', target: 5, current: 0 },
      { name: 'Current Affairs MCQs', target: 5, current: 0 }
    ];
  });

  const [newCategory, setNewCategory] = useState({ name: '', target: 5 });

  const handleAddCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, { ...newCategory, current: 0 }]);
      setNewCategory({ name: '', target: 5 });
    }
  };

  const handleDeleteCategory = (index: number) => {
    setCategories(categories.filter((_: Category, idx: number) => idx !== index));
  };

  const updateCount = (index: number, delta: number) => {
    const newCategories = [...categories];
    newCategories[index].current = Math.max(0, newCategories[index].current + delta);
    setCategories(newCategories);
  };

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
              {/* Commented out streak display to avoid using unused state */}
              {/* <div className="flex items-center gap-2">
                <Award className="text-yellow-500" />
                <span>{streak} day streak</span>
              </div> */}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UPSCTracker;
