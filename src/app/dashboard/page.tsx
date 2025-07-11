'use client'

import { useFirebaseTasks } from '@/hooks/useFirebaseTasks'
import { addTask, deleteTask } from '@/lib/taskService'
import { useUser } from '@clerk/nextjs'

export default function Dashboard() {
  const { user } = useUser()
  const { tasks, setTasks, loading } = useFirebaseTasks()

  const handleAdd = async () => {
    if (!user) return

    const newTask = {
      title: 'New Task',
      description: 'Write your description here',
      dueDate: new Date().toISOString(),
      status: 'Pending',
    }

    const created = await addTask(newTask, user.id)
    setTasks((prev) => [...prev, created])
  }

  const handleDelete = async (id: string) => {
    await deleteTask(id)
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  if (loading) return <p className="p-4">Loading tasks...</p>

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Tasks</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="border p-4 rounded">
              <div className="font-semibold">{task.title}</div>
              <p className="text-sm text-gray-500">{task.description}</p>
              <p className="text-xs">Status: {task.status}</p>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-600 text-sm mt-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
