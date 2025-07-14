import { create } from 'zustand'

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed'

export type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  status: TaskStatus
  userId: string
  createdAt: number
}

type TaskStore = {
  selectedTask: Task | null
  setSelectedTask: (task: Task | null) => void

  filterStatus: TaskStatus | 'All'
  setFilterStatus: (status: TaskStatus | 'All') => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),

  filterStatus: 'All',
  setFilterStatus: (status) => set({ filterStatus: status }),
}))
