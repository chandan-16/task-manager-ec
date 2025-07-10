'use client';
import { useEffect, useState } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = filter
    ? tasks.filter(task => task.status === filter)
    : tasks;

  return (
    <div className="space-y-4 mt-6">
      <div className="flex gap-4 items-center">
        <label className="text-gray-700">Filter:</label>
        <select onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
          <option value="">All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {filteredTasks.map(task => (
        <div key={task.id} className="bg-white border p-4 rounded shadow-sm">
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
          <p className="text-sm text-blue-600">{task.status}</p>
          <button onClick={() => handleDelete(task.id)} className="text-red-500 mt-2 hover:underline">Delete</button>
        </div>
      ))}
    </div>
  );
}