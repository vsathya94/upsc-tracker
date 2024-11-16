'use client'; // Add this line at the top of the file

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Plus, Minus, Award, Clock, BookOpen, PenTool, Trash, UserPlus, ThumbsUp } from 'lucide-react';

const UPSCTracker = () => {
  const [userName, setUserName] = useState('');
  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('upscCategories');
    return saved ? JSON.parse(saved) : [
      { name: 'Static MCQs', target: 5, current: 0 },
      { name: 'Current Affairs MCQs', target: 5, current: 0 }
    ];
  });

  const [mainsAnswers, setMainsAnswers] = useState(() => {
    const saved = localStorage.getItem('upscMains');
    return saved ? JSON.parse(saved) : { target: 2, current: 0 };
  });

  const [optionalAnswers, setOptionalAnswers] = useState(() => {
    const saved = localStorage.getItem('upscOptional');
    return saved ? JSON.parse(saved) : { target: 2, current: 0 };
  });

  const [studyHours, setStudyHours] = useState(() => {
    const saved = localStorage.getItem('upscHours');
    return saved ? JSON.parse(saved) : { target: 8, current: 0 };
  });

  // Streak state: retained for future use
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('upscStreak');
    return saved ? JSON.parse(saved) : 0;
  });
  
  // Temporarily disabling the warning for unused setStreak until it's implemented
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [newCategory, setNewCategory] = useState({ name: '', target: 5 });

  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');

  useEffect(() => {
    localStorage.setItem('upscCategories', JSON.stringify(categories));
    localStorage.setItem('upscMains', JSON.stringify(mainsAnswers));
    localStorage.setItem('upscOptional', JSON.stringify(optionalAnswers));
    localStorage.setItem('upscHours', JSON.stringify(studyHours));
    localStorage.setItem('upscStreak', JSON.stringify(streak));
  }, [categories, mainsAnswers, optionalAnswers, studyHours, streak]);

  const handleAddCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, { ...newCategory, current: 0 }]);
      setNewCategory({ name: '', target: 5 });
    }
  };

  const handleDeleteCategory = (index) => {
    setCategories(categories.filter((_, idx) => idx !== index));
  };

  const updateCount = (index, delta) => {
    const newCategories = [...categories];
    newCategories[index].current = Math.max(0, newCategories[index].current + delta);
    setCategories(newCategories);
  };

  const shareProgress = () => {
    const text = `🎯 My UPSC Prep Today:
MCQs: ${categories.map(c => `${c.name}: ${c.current}/${c.target}`).join(', ')}
✍️ Mains Answers: ${mainsAnswers.current}/${mainsAnswers.target}
📝 Optional Answers: ${optionalAnswers.current}/${optionalAnswers.target}
⏰ Study Hours: ${studyHours.current}/${studyHours.target}
🔥 Streak: ${streak} days
#UPSC #UPSCPreparation`;

    if (navigator.share) {
      navigator.share({
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Progress copied to clipboard!');
    }
  };

  const handleAddFriend = () => {
    if (newFriend) {
      setFriends([...friends, { name: newFriend, kudos: 0 }]);
      setNewFriend('');
    }
  };

  const giveKudos = (index) => {
    const updatedFriends = [...friends];
    updatedFriends[index].kudos += 1;
    setFriends(updatedFriends);
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
          <CardTitle className="flex justify-between items-center">
            <span>UPSC Prep Tracker</span>
            <div className="flex items-center gap-2">
              <Award className="text-yellow-500" />
              <span>{streak} day streak</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCount(index, -1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{category.current}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCount(index, 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCategory(index)}
                  >
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

          {/* Rest of the code continues as in your original version... */}
        </CardContent>
      </Card>

      {/* Rest of the component remains unchanged */}
    </div>
  );
};

export default UPSCTracker
