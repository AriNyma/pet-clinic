import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import showNotification from '../Components/ShowNotification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });
      const accessToken = response.data.access_token;
      localStorage.setItem('accessToken', accessToken);
  
      // Check if the id belongs to a doctor or an owner
      const userType = response.data.id === 0 ? 'doctor' : 'owner';
  
      // Redirect to the appropriate page based on the user type
      history(`/${userType}`, { userType }); // Passing userType as a parameter
    } catch (error) {
      console.error(error);
      
      // Check if the error is due to invalid email or password
      if (error.response && error.response.status === 401) {
        showNotification('Error', 'Invalid email or password', 'error');
      } else {
        // Handle other errors
        showNotification('Error', 'An unexpected error occurred', 'error');
      }
    }
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
