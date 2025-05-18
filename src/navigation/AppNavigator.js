import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import TodoListScreen from '../screens/TodoListScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Các màn hình xác thực */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

      {/* Màn hình TodoList sau khi login */}
      <Stack.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{ title: 'Danh sách công việc' }}
      />
    </Stack.Navigator>
  );
}
