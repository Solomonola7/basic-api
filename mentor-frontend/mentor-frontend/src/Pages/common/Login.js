import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('mentee');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('role', role);
    // Redirect based on role
    if (role === 'admin') {
      navigate('/admin/matches'); // or any admin route
    } else if (role === 'mentor') {
      navigate('/mentor/dashboard');
    } else {
      navigate('/mentee/dashboard');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
        </select>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;