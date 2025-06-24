import React, { useState, useContext } from 'react';
import styles from './Login.module.scss';
import { login } from '../../api/authApi';
import { DataContext } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_white.png'; // Update path as needed
const Login = () => {
  const { setAuthToken } = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
      const token = response.data.accessToken;
      setAuthToken(token);
      navigate('/');
    } catch (error) {
      alert('Login failed!');
    }
    setLoading(false);
  };
  return (
    <div className={styles.background}>
      <div className={styles.loginCard}>
        {/* Left Section */}
        <div className={styles.left}>
          <img src={logo} alt="Alankar Logo" className={styles.logo} />
          <div className={styles.welcomeMsg}>
            <span>Welcome to</span>
            <span className={styles.companyName}>Alankar</span>
          </div>
        </div>
        {/* Right Section */}
        <div className={styles.right}>
          <h2 className={styles.loginTitle}>Log In</h2>
          <p className={styles.subtext}>Log in by entering information below</p>
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                {/* Email SVG */}
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 5H18C18.7956 5 19.5587 5.31607 20.1213 5.87868C20.6839 6.44129 21 7.20435 21 8V17C21 17.7956 20.6839 18.5587 20.1213 19.1213C19.5587 19.6839 18.7956 20 18 20H5C4.20435 20 3.44129 19.6839 2.87868 19.1213C2.31607 18.5587 2 17.7956 2 17V8C2 7.20435 2.31607 6.44129 2.87868 5.87868C3.44129 5.31607 4.20435 5 5 5ZM5 6C4.5 6 4.06 6.17 3.72 6.47L11.5 11.5L19.28 6.47C18.94 6.17 18.5 6 18 6H5ZM11.5 12.71L3.13 7.28C3.05 7.5 3 7.75 3 8V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H18C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17V8C20 7.75 19.95 7.5 19.87 7.28L11.5 12.71Z" fill="#4F5051"/>
</svg>
              </span>
              <input
                type="email"
                placeholder="E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                {/* Lock SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 16 16" fill="none">
  <path d="M13.35 16H2.65C1.74 16 1 15.26 1 14.35V6.65C1 5.74 1.74 5 2.65 5H13.35C14.26 5 15 5.74 15 6.65V14.34C15 15.25 14.26 15.99 13.35 15.99V16ZM2.65 6C2.29 6 2 6.29 2 6.65V14.34C2 14.7 2.29 14.99 2.65 14.99H13.35C13.71 14.99 14 14.7 14 14.34V6.65C14 6.29 13.71 6 13.35 6H2.65Z" fill="#4F5051"/>
  <path d="M12.54 6H3.45996V4.54C3.45996 2.04 5.49996 0 7.99996 0C10.5 0 12.54 2.04 12.54 4.54V6ZM4.45996 5H11.54V4.54C11.54 2.59 9.94996 1 7.99996 1C6.04996 1 4.45996 2.59 4.45996 4.54V5Z" fill="#4F5051"/>
  <path d="M12 11.5C12.5523 11.5 13 11.0523 13 10.5C13 9.94772 12.5523 9.5 12 9.5C11.4477 9.5 11 9.94772 11 10.5C11 11.0523 11.4477 11.5 12 11.5Z" fill="#4F5051"/>
  <path d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94772 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94772 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z" fill="#4F5051"/>
  <path d="M4 11.5C4.55228 11.5 5 11.0523 5 10.5C5 9.94772 4.55228 9.5 4 9.5C3.44772 9.5 3 9.94772 3 10.5C3 11.0523 3.44772 11.5 4 11.5Z" fill="#4F5051"/>
</svg>   </span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                required
              />
              <span
                className={styles.showPassToggle}
                onClick={() => setShowPass((v) => !v)}
                tabIndex={0}
                title={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
                  // Eye Open
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M1 10C2.73 5.61 7.17 2.5 12 2.5C16.83 2.5 21.27 5.61 23 10C21.27 14.39 16.83 17.5 12 17.5C7.17 17.5 2.73 14.39 1 10Z" stroke="#4F5051" strokeWidth="1.2"/><circle cx="12" cy="10" r="3" stroke="#4F5051" strokeWidth="1.2"/></svg>
                ) : (
                  // Eye Closed
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M10.73 5.073C11.1516 5.02419 11.5756 4.99982 12 5C16.664 5 20.4 7.903 22 12C21.6126 12.9966 21.0893 13.9348 20.445 14.788M6.52 6.519C4.48 7.764 2.9 9.693 2 12C3.6 16.097 7.336 19 12 19C13.9321 19.0102 15.8292 18.484 17.48 17.48M9.88 9.88C9.6014 10.1586 9.3804 10.4893 9.22963 10.8534C9.07885 11.2174 9.00125 11.6075 9.00125 12.0015C9.00125 12.3955 9.07885 12.7856 9.22963 13.1496C9.3804 13.5137 9.6014 13.8444 9.88 14.123C10.1586 14.4016 10.4893 14.6226 10.8534 14.7734C11.2174 14.9242 11.6075 15.0018 12.0015 15.0018C12.3955 15.0018 12.7856 14.9242 13.1496 14.7734C13.5137 14.6226 13.8444 14.4016 14.123 14.123" stroke="#4F5051" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 4L20 20" stroke="#4F5051" stroke-width="1.5" stroke-linecap="round"/>
</svg>    )}
              </span>
            </div>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
