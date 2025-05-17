import React from 'react';
import { TextInput, TextInputProps, View, Text, StyleSheet } from 'react-native';

const Input: React.FC<TextInputProps & { label: string; error?: string }> = ({ label, error, ...props }) => (
  <View style={styles.container}>
    <Text>{label}</Text>
    <TextInput style={styles.input} {...props} />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  error: { color: 'red', fontSize: 12 },
});

export default Input;