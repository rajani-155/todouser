import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Todo from './components/todo';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [ setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/" element={<Home />} /> 
      </Routes>
    </Router>
  );
};

export default App;
