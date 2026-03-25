import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../App';
import AnimatedBackground from './AnimatedBackground';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) =>{
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res && res.data){
        localStorage.setItem('token', res.data.token);
        login(res.data.user);
        navigate('/');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  }

  return (
    <AnimatedBackground>
      <div className="auth-form-container">
        <h2>Welcome Back</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Email</label>
            <input 
              type="email"
              value={email} 
              onChange={e=>setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="btn" type="submit">Login</button>
        </form>
        <div className="auth-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </div>
      </div>
    </AnimatedBackground>
  )
}
