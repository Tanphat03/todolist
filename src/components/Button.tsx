import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button: React.FC<{ title: string; onPress: () => void }> = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: { color: '#fff', fontWeight: 'bold' },
});

export default Button;