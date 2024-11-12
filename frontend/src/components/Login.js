import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ setAuthToken }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const endpoint = isSignup ? '/api/signup' : '/api/login';
      console.log('req sent');
      const response = await axios.post(endpoint, { email, password });
      console.log('response recieved');
      const { token } = response.data;

      // Save token in localStorage and update state
      localStorage.setItem('authToken', token);
      setAuthToken(token); // Pass the token up to the parent component
      // Navigate to the PasswordManager page
      navigate('/passwords');
    } catch (err) {
      setError(isSignup ? 'Signup failed' : 'Invalid email or password');
    }
  };

  return (
    <div className="login-form">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='formdiv'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='formdiv'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          className="toggle-button"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default Login;
