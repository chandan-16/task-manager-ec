import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore'
import { db } from './firebase'

// ✅ Add a task
export async function addTask(task: any, userId: string) {
  const taskWithUser = { ...task, userId, createdAt: Date.now() }
  const docRef = await addDoc(collection(db, 'tasks'), taskWithUser)
  return { id: docRef.id, ...taskWithUser }
}

// ✅ Get all tasks for user
export async function getTasks(userId: string) {
  const q = query(collection(db, 'tasks'), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// ✅ Update a task
export async function updateTask(taskId: string, updatedData: any) {
  const docRef = doc(db, 'tasks', taskId)
  await updateDoc(docRef, updatedData)
  return true
}

// ✅ Delete a task
export async function deleteTask(taskId: string) {
  const docRef = doc(db, 'tasks', taskId)
  await deleteDoc(docRef)
  return true
}
