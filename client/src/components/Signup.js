import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../App';
import AnimatedBackground from './AnimatedBackground';

export default function Signup(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) =>{
    e.preventDefault();
    try {
  const res = await api.post('/auth/signup', { name, email, password, avatar });
      if (res && res.data){
        localStorage.setItem('token', res.data.token);
        login(res.data.user);
        navigate('/');
      }
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  }

  return (
    <AnimatedBackground>
      <div className="auth-form-container">
        <h2>Join EcoTrack</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Name</label>
            <input 
              type="text"
              value={name} 
              onChange={e=>setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
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
              placeholder="Create a password"
              required
            />
          </div>
          <div className="form-row">
            <label>Profile Image URL (optional)</label>
            <input 
              type="url" 
              value={avatar} 
              onChange={e=>setAvatar(e.target.value)}
              placeholder="https://example.com/your-photo.jpg"
            />
          </div>
          <button className="btn" type="submit">Sign Up</button>
        </form>
        <div className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </AnimatedBackground>
  )
}
