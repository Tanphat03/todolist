import React from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthProvider';  // Dùng hook lấy context
import { useTodos } from '../hooks/useTodos';

export default function TodoListScreen() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading || !user) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  const { todos, loading: todosLoading, addTodo, updateTodo, deleteTodo } = useTodos(user.uid);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  if (todosLoading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  const handleAddTodo = async () => {
    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề');
      return;
    }
    await addTodo(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Xin chào, {user.displayName || user.email}
      </Text>

      <TextInput
        placeholder="Tiêu đề"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 60 }]}
        multiline
      />

      <Button title="Thêm công việc" onPress={handleAddTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              onPress={() => updateTodo(item.id, { completed: !item.completed })}
              style={{ flex: 1 }}
            >
              <Text style={[styles.todoTitle, item.completed && styles.completed]}>
                {item.title}
              </Text>
              {item.description ? (
                <Text style={styles.todoDescription}>{item.description}</Text>
              ) : null}
            </TouchableOpacity>

            <Button
              title="Xóa"
              color="red"
              onPress={() => deleteTodo(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  welcomeText: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
  },
  todoItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  todoTitle: { fontSize: 16 },
  todoDescription: { color: '#666' },
  completed: { textDecorationLine: 'line-through', color: '#999' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
