import React, { useState } from 'react';
import axios from 'axios';
import './Login.js.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistered ? '/api/users/login' : '/api/users/register';
    try {
      const response = await axios.post(url, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data.message);
      if (isRegistered) {
        // Redirect to dashboard on successful login
        window.location.href = '/dashboard';
      } else {
        setIsRegistered(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistered ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {isRegistered ? 'Login' : 'Register'}
        </button>
        <p onClick={() => setIsRegistered(!isRegistered)}>
          {isRegistered ? 'Create an account' : 'Already have an account? Login'}
        </p>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
