import React from 'react';
'use-client';
import { useState, useEffect } from 'react';

export default function TaskForm({ onAdd }: { onAdd: (task : any ) => void }) {
    const [form, setForm] = useState({
        title: '', 
        description: '',
        dueDate: '',
        status : 'Pending'
    });

    const handleChange = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const task = {
            id: Date.now(),
            ...form,
        }
        onAdd(task);
        setForm({title: '', description: '', dueDate: '', status : 'Pending'})
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white border rounded shadow">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border px-3 py-2 rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" required />
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <select name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Task</button>
        </form>
    )
}

