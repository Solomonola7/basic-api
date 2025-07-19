import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('mentee');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('role', role);
    if (role === 'admin') {
      navigate('/admin/matches'); // or any admin route
    } else if (role === 'mentor') {
      navigate('/mentor/dashboard');
    } else {
      navigate('/mentee/dashboard');
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="login-wrapper">
          <h2>Login</h2>
          <div className="form-group">
            <label>Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <footer className="footer">
        © 2025 Solomonola
      </footer>
    </div>
  );
};

export default Login;