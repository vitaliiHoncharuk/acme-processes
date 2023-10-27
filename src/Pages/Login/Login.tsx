import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Grid, Typography } from '@mui/material';
import { useAuth } from '../../common/auth/AuthContext';
import { useNotification } from '../../components/Notification/NotificationContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setNotification } = useNotification();
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate('/editor');
    }
  }, [user, navigate]);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      login(username, password);
      setNotification({ message: 'Login successful!', severity: 'success' });
      navigate('/editor');
    } else {
      setNotification({ message: 'Invalid credentials', severity: 'error' });
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Button
          data-testid="login-button"
          variant="contained"
          color="primary"
          onClick={handleLogin}
          style={{ marginTop: '10px' }}
        >
          Login
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
