import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AddAction from './components/AddAction';
import Leaderboard from './components/Leaderboard';
import EcoBot from './components/EcoBot';

export const AuthContext = React.createContext();

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = (data) => setUser(data);
  const logout = () => { localStorage.removeItem('token'); setUser(null); };

  // Hide navbar on auth pages
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!isAuthPage && <Navbar />}
      <div className={!isAuthPage ? "container" : ""}>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/add" element={user ? <AddAction /> : <Navigate to="/login" />} />
          <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/login" />} />
          <Route path="/bot" element={user ? <EcoBot /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
