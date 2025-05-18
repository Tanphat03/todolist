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
import { db } from '../firebase/config'; // Đường dẫn tới file cấu hình Firebase của bạn

interface TodoData {
  title: string;
  description: string;
  completed?: boolean;
  createdAt?: number;
  updatedAt?: any;
}

interface TodoDetailScreenProps {
  route: {
    params: {
      id: string;  // trùng với TodoStackParamList
    };
  };
  navigation: any;
}

export default function TodoDetailScreen({
  route,
  navigation,
}: TodoDetailScreenProps) {
  const { id } = route.params;

  const [todo, setTodo] = useState<TodoData | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const docRef = doc(db, 'todos', id);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as TodoData;
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
  }, [id, navigation]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Tiêu đề không được để trống');
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(db, 'todos', id);
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
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
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
