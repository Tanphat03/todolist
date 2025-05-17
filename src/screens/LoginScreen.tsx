import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import Input from '../components/Input';
import Button from '../components/Button';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required'),
});

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { visible, toggleVisibility } = useTogglePasswordVisibility();

  const handleLogin = async (values: { email: string; password: string }, { setSubmitting, setErrors }: any) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error: any) {
      setErrors({ email: 'Invalid credentials' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <Input
              label="Email"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email && errors.email ? errors.email : ''}
            />
            <View>
              <Input
                label="Password"
                secureTextEntry={!visible}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password ? errors.password : ''}
              />
              <Icon
                name={visible ? 'eye-off' : 'eye'}
                size={20}
                onPress={toggleVisibility}
                style={{ position: 'absolute', right: 10, top: 35 }}
              />
            </View>
            <Button title="Login" onPress={handleSubmit} />
            <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Don't have an account? Register</Text>
            <Text style={styles.link} onPress={() => navigation.navigate('ResetPassword')}>Forgot password?</Text>

          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' },
});

export default LoginScreen;