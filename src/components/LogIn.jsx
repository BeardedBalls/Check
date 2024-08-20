import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login logic here (e.g., send username/password to an API)
    if (username === 'user' && password === 'pass') { // Example check
      navigate('/admin');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Login</h2>
        <div style={styles.inputContainer}>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
        <button type="button" onClick={handleRegister} style={styles.registerButton}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("bgLogIn.jpg")', // Replace with your background image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  registerButton: {
    padding: '10px',
    fontSize: '16px',
    color: '#007bff',
    backgroundColor: '#fff',
    border: '2px solid #007bff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginForm;
