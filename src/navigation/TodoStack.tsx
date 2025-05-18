// src/navigation/TodoStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../screens/TodoListScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen'; // nếu có màn chi tiết

const Stack = createNativeStackNavigator();

const TodoStack = () => {
  return (
    <Stack.Navigator initialRouteName="TodoList">
      <Stack.Screen name="TodoList" component={TodoListScreen} options={{ title: 'Danh sách công việc' }} />
      <Stack.Screen name="TodoDetail" component={TodoDetailScreen} options={{ title: 'Chi tiết công việc' }} />
    </Stack.Navigator>
  );
};

export default TodoStack;
