import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    // Implement API call to POST /login with email and password
    // Set the appropriate access token based on the user role
    // For simplicity, I'm using hardcoded tokens here
    const accessToken = 'doctor-access-token'; // or 'owner-access-token'
    
    // Store the token in localStorage or a secure way
    localStorage.setItem('accessToken', accessToken);
    
    // Redirect to the appropriate role-based page
    history.push(accessToken.includes('doctor') ? '/doctor' : '/owner');
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;