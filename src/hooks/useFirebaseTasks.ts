'use client'

import { useEffect, useState } from 'react'
import { getTasks } from '@/lib/taskService'
import { useUser } from '@clerk/nextjs'

export function useFirebaseTasks() {
  const { user } = useUser()
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetch = async () => {
      setLoading(true)
      const data = await getTasks(user.id)
      setTasks(data)
      setLoading(false)
    }

    fetch()
  }, [user])

  return { tasks, setTasks, loading }
}
