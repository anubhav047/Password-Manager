import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PasswordManager.css';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState({ name: '', password: '' });
  const authToken = localStorage.getItem('authToken'); // Retrieve authToken directly from localStorage

  const fetchPasswords = async () => {
    try {
      const response = await axios.get('/api/passwords', {
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

  const deletePassword = async (id) => {
    console.log("Deleting password with ID:", id); // Check if ID is being passed correctly
    try {
      console.log(id);
      await axios.delete(`/api/passwords/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      fetchPasswords(); // Refresh the password list after deletion
    } catch (error) {
      console.error('Error deleting password:', error);
    }
  };
  

  useEffect(() => {
    if (authToken) {
      fetchPasswords(); // Fetch passwords only if authToken is available
    }
  }, [authToken]);

  return (
    <div className="password-manager">
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
