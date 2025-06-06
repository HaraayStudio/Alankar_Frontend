// src/components/Login/Login.jsx
import React, { useState, useContext } from 'react';
import styles from './Login.module.scss';
import { login } from '../../api/authApi';
import { DataContext } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { setAuthToken ,authToken} = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await login(email, password);
const token = response.data.accessToken;
setAuthToken(token)
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } 
  };
  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.inputField}
      />
      <button onClick={handleLogin} className={styles.loginButton}>
        Login
      </button>
    </div>
  );
};
export default Login;
