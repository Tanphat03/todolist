import { useState } from 'react';

export const useTogglePasswordVisibility = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible((v) => !v);
  return { visible, toggleVisibility };
};