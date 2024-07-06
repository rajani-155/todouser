import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/register', { username, password });
      if (response && response.data) {
        localStorage.setItem('token', response.data.token);
        setMessage('Registration successful');
        setOpen(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage('Registration failed: Invalid response');
        setOpen(true);
      }
    } catch (error) {
      console.error('Error registering:', error);
      setMessage('Registration failed: ' + (error.response?.data?.message || error.message));
      setOpen(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <h1 className="text-center card-header  text-white"  style={{backgroundColor: '#ADD8E6'}}>Register Page</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-3 mt-5 card-body">
            <label htmlFor="username" className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </div>
          <div className="mb-3 mt-3 card-body">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn ms-4 mb-4" style={{backgroundColor: '#ADD8E6'}}>Register</button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message={message}
          ContentProps={{
            sx: {
              border: "1px solid black",
              borderRadius: "40px",
              color: "black",
              marginTop: "500px",
              bgcolor: "lightblue",
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
              "& .MuiSnackbarContent-message": {
                width: "inherit",
                textAlign: "center",
              }
            }
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      </div>
    </div>
  );
};

export default Register;
