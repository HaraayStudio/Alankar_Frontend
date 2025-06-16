import React, { useState, useContext } from 'react';
import styles from './Login.module.scss';
import { login } from '../../api/authApi';
import { DataContext } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import logo from '../../assets/logo_vertical.png'; // update path as needed
const Login = () => {
  const { setAuthToken } = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      const token = response.data.accessToken;
      setAuthToken(token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <img src={logo} alt="Alankar Logo" className={styles.logo} />
        <div className={styles.inputWrapper}>
          {/* <MdEmail className={styles.inputIcon} /> */}
          <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 5H18C18.7956 5 19.5587 5.31607 20.1213 5.87868C20.6839 6.44129 21 7.20435 21 8V17C21 17.7956 20.6839 18.5587 20.1213 19.1213C19.5587 19.6839 18.7956 20 18 20H5C4.20435 20 3.44129 19.6839 2.87868 19.1213C2.31607 18.5587 2 17.7956 2 17V8C2 7.20435 2.31607 6.44129 2.87868 5.87868C3.44129 5.31607 4.20435 5 5 5ZM5 6C4.5 6 4.06 6.17 3.72 6.47L11.5 11.5L19.28 6.47C18.94 6.17 18.5 6 18 6H5ZM11.5 12.71L3.13 7.28C3.05 7.5 3 7.75 3 8V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H18C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17V8C20 7.75 19.95 7.5 19.87 7.28L11.5 12.71Z" fill="#4F5051"/>
</svg>
          <input
            type="email"
            placeholder="E-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputWrapper}>
          {/* <MdLock className={styles.inputIcon} /> */}
          <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M13.35 16H2.65C1.74 16 1 15.26 1 14.35V6.65C1 5.74 1.74 5 2.65 5H13.35C14.26 5 15 5.74 15 6.65V14.34C15 15.25 14.26 15.99 13.35 15.99V16ZM2.65 6C2.29 6 2 6.29 2 6.65V14.34C2 14.7 2.29 14.99 2.65 14.99H13.35C13.71 14.99 14 14.7 14 14.34V6.65C14 6.29 13.71 6 13.35 6H2.65Z" fill="#4F5051"/>
  <path d="M12.54 6H3.45996V4.54C3.45996 2.04 5.49996 0 7.99996 0C10.5 0 12.54 2.04 12.54 4.54V6ZM4.45996 5H11.54V4.54C11.54 2.59 9.94996 1 7.99996 1C6.04996 1 4.45996 2.59 4.45996 4.54V5Z" fill="#4F5051"/>
  <path d="M12 11.5C12.5523 11.5 13 11.0523 13 10.5C13 9.94772 12.5523 9.5 12 9.5C11.4477 9.5 11 9.94772 11 10.5C11 11.0523 11.4477 11.5 12 11.5Z" fill="#4F5051"/>
  <path d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94772 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94772 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z" fill="#4F5051"/>
  <path d="M4 11.5C4.55228 11.5 5 11.0523 5 10.5C5 9.94772 4.55228 9.5 4 9.5C3.44772 9.5 3 9.94772 3 10.5C3 11.0523 3.44772 11.5 4 11.5Z" fill="#4F5051"/>
</svg>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <button onClick={handleLogin} className={styles.loginButton}>
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
