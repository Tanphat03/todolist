import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export type Todo = {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
};

export const useTodos = (userId: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'todos'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: Todo[] = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        userId: docSnap.data().userId,
        title: docSnap.data().title,
        description: docSnap.data().description || '',
        completed: docSnap.data().completed,
        createdAt: docSnap.data().createdAt,
      }));

      setTodos(items);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const addTodo = async (title: string, description: string) => {
    await addDoc(collection(db, 'todos'), {
      userId,
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    });
  };

  const updateTodo = async (id: string, data: Partial<Todo>) => {
    await updateDoc(doc(db, 'todos', id), data);
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return { todos, loading, addTodo, updateTodo, deleteTodo };
};
