import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PasswordManager from './components/PasswordManager';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setAuthToken={setAuthToken} />}
        />
        <Route
          path="/passwords"
          element={
            authToken ? (
              <PasswordManager authToken={authToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={authToken ? "/passwords" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
