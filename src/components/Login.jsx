// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/login', { username, password });
      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful');
        setOpen(true);
        setTimeout(() => {
          navigate('/todos');
        }, 2000);
      } else {
        setError('Login failed: Invalid response');
        setOpen(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Login failed: ' + (error.response?.data?.message || error.message));
      setOpen(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <h2 className="text-center card-header  text-white" style={{backgroundColor: '#ADD8E6'}}>Login Page</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3 mt-4 card-body">
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
          <button type="submit" className="btn ms-4 mb-4" style={{backgroundColor: '#ADD8E6'}}>Login</button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message={message || error}
          ContentProps={{
            sx: {
              border: "1px solid black",
              borderRadius: "40px",
              color: "black",
              bgcolor: "lightblue",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "500px",
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

export default Login;
