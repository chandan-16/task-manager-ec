'use client';
import Header from '@/components/Header'; // your existing header component
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);

  const handleAdd = (task: any) => {
    const existing = JSON.parse(localStorage.getItem('tasks') || '[]');
    localStorage.setItem('tasks', JSON.stringify([...existing, task]));
    setRefresh(!refresh); // force re-render TaskList
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-6">Your Tasks</h1>

        <TaskForm onAdd={handleAdd} />
        <TaskList key={refresh ? 'a' : 'b'} /> {/* key forces re-render */}
      </div>
    </main>
  );
}
