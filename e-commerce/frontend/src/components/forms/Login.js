import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Import the useAuth hook
// import axios from 'axios';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const { login } = useAuth(); // Use the login function from the context
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Instead of directly making an API call, call the login function from the context
      await login(data.username, data.password);
      setOpenSnackbar(true);
      navigate('/');
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField
        {...register('username')}
        label="Username"
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />
      <TextField
        {...register('password')}
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Login Successful!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Login;