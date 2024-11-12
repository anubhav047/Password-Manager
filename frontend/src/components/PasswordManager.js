import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PasswordManager.css';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState({ name: '', password: '' });
  const authToken = localStorage.getItem('authToken'); // Retrieve authToken directly from localStorage
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchPasswords = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/passwords`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setPasswords(response.data.map(password => ({
        ...password,
        _id: password._id || password.id // Ensures _id is used consistently
      })));
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  const addPassword = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/passwords/add`,
        { ...newPassword },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setNewPassword({ name: '', password: '' });
      fetchPasswords(); // Refresh the password list
    } catch (error) {
      console.error('Error adding password:', error);
    }
  };

  const deletePassword = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/passwords/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      fetchPasswords(); // Refresh the password list after deletion
    } catch (error) {
      console.error('Error deleting password:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from local storage
    window.location.href = '/'; // Redirect to the login page
  };

  useEffect(() => {
    if (authToken) {
      fetchPasswords(); // Fetch passwords only if authToken is available
    }
  }, [authToken]);

  return (
    <div className="password-manager">
      <div className="header">
        <h2>Password Manager</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
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
      <table className="password-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((pw, index) => (
            <tr key={index}>
              <td>{pw.name}</td>
              <td>{pw.password}</td>
              <td>
                <i
                  className="fas fa-trash delete-icon"
                  onClick={() => deletePassword(pw._id)}
                  title="Delete Password"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasswordManager;
