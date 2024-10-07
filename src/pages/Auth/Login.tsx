// src/Login.tsx
import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';

type LoginFormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate(); // Yönlendirme için navigate fonksiyonunu alıyoruz

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password); // AuthContext'teki login fonksiyonunu çağırıyoruz
      navigate('/home'); // Başarılı giriş sonrası yönlendirme

    } catch (error) {
      console.error('Giriş sırasında bir hata oluştu:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Giriş Yap
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('email', { required: 'Email alanı gereklidir' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Şifre"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          {...register('password', { required: 'Şifre alanı gereklidir' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Giriş Yap
        </Button>
      </form>
    </Box>
  );
};

export default Login;
