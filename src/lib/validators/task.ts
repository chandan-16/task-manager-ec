// lib/validators/task.ts
import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  dueDate: z.string().refine(
    (date) => {
      const now = new Date();
      const input = new Date(date);
      return input >= now;
    },
    { message: 'Due date must be in the future' }
  ),
  status: z.enum(['Pending', 'In Progress', 'Completed']),
});
