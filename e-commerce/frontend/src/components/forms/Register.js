import React, { useState } from 'react';
import { TextField, Button, FormControl, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/api/user/register/', formData);

      // On successful registration
      if (response.status === 201) {
        // Show success message
        setSnackbarSeverity('success');
        setSnackbarMessage('Registration successful!');
        setOpenSnackbar(true);

        // Redirect to the login page after a brief delay
        setTimeout(() => {
          navigate('/login'); 
        }, 2000);
      } else {
        handleRegistrationError(); // Handle registration failure
      }
    } catch (error) {
      console.error(error);
      handleRegistrationError(); // Handle registration failure
    }
  };

  const handleRegistrationError = () => {
    // Show error message for registration failure
    setSnackbarSeverity('error');
    setSnackbarMessage('Registration failed. Please try again.');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">Register</Typography>

      <FormControl>
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </form>
  );
};

export default Register;