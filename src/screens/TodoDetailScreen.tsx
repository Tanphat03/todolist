// src/screens/TodoDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config'; // cấu hình Firebase của bạn

// Interface kiểu dữ liệu Todo
interface Todo {
  title: string;
  description: string;
  completed?: boolean;
  createdAt?: number;
  updatedAt?: any;
}

interface TodoDetailScreenProps {
  route: {
    params: {
      todoId: string;
    };
  };
  navigation: any;
}

export default function TodoDetailScreen({
  route,
  navigation,
}: TodoDetailScreenProps) {
  const { todoId } = route.params;

  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const docRef = doc(db, 'todos', todoId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Todo;
          setTodo(data);
          setTitle(data.title);
          setDescription(data.description);
          setLoading(false);
        } else {
          Alert.alert('Lỗi', 'Công việc không tồn tại hoặc đã bị xóa');
          navigation.goBack();
        }
      },
      (error) => {
        Alert.alert('Lỗi', error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [todoId, navigation]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Tiêu đề không được để trống');
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, 'todos', todoId);
      await updateDoc(docRef, {
        title,
        description,
        updatedAt: serverTimestamp(),
      });
      Alert.alert('Thành công', 'Cập nhật công việc thành công');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Lỗi', error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Nhập tiêu đề"
      />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Nhập mô tả"
      />

      <Button
        title={saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        onPress={handleSave}
        disabled={saving}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginBottom: 8, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
  },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
