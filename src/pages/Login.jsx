import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'; 
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); 

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.toke

       
        localStorage.setItem('token', token);

        
        dispatch(login({ token })); 

        navigate('/'); 
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Invalid username or password');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
