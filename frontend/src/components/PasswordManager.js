import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState({ name: '', password: '' });
  const authToken = localStorage.getItem('authToken'); // Retrieve authToken directly from localStorage

  const fetchPasswords = async () => {
    try {
      const response = await axios.get('/api/passwords', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setPasswords(response.data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  const addPassword = async () => {
    try {
      await axios.post(
        '/api/passwords/add',
        { ...newPassword },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setNewPassword({ name: '', password: '' });
      fetchPasswords(); // Refresh the password list
    } catch (error) {
      console.error('Error adding password:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchPasswords(); // Fetch passwords only if authToken is available
    }
  }, [authToken]);

  return (
    <div>
      <h2>Password Manager</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPassword();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={newPassword.name}
          onChange={(e) => setNewPassword({ ...newPassword, name: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newPassword.password}
          onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
          required
        />
        <button type="submit">Add Password</button>
      </form>
      <h3>Stored Passwords</h3>
      <ul>
        {passwords.map((pw, index) => (
          <li key={index}>
            {pw.name}: {pw.password}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordManager;
