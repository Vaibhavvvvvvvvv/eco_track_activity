import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, PlusCircle, LogOut, LogIn, UserPlus, Leaf, Trophy, MessageCircle } from 'lucide-react';
import { AuthContext } from '../App';

export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('Dashboard');
    else if (path === '/add') setActiveTab('Add Action');
    else if (path === '/leaderboard') setActiveTab('Leaderboard');
    else if (path === '/bot') setActiveTab('Eco Bot');
    else if (path === '/login') setActiveTab('Login');
    else if (path === '/signup') setActiveTab('Signup');
  }, [location]);

  const navItems = user ? [
    { name: 'Dashboard', url: '/', icon: Home },
    { name: 'Add Action', url: '/add', icon: PlusCircle },
    { name: 'Leaderboard', url: '/leaderboard', icon: Trophy },
    { name: 'Eco Bot', url: '/bot', icon: MessageCircle },
    { name: 'Logout', url: '#', icon: LogOut, action: logout }
  ] : [
    { name: 'Login', url: '/login', icon: LogIn },
    { name: 'Signup', url: '/signup', icon: UserPlus }
  ];

  return (
    <div className="tubelight-navbar">
      <div className="tubelight-navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Leaf size={28} strokeWidth={2.5} />
          <strong>EcoTrack</strong>
        </div>

        {/* Nav Items */}
        <div className="tubelight-nav-items">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return item.action ? (
              <button
                key={item.name}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.name);
                  item.action();
                }}
                className={`tubelight-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} strokeWidth={2.5} className="nav-icon" />
                <span className="nav-text">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="tubelight-indicator"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="lamp-glow" />
                    <div className="lamp-glow-2" />
                    <div className="lamp-glow-3" />
                  </motion.div>
                )}
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={`tubelight-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} strokeWidth={2.5} className="nav-icon" />
                <span className="nav-text">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="tubelight-indicator"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="lamp-glow" />
                    <div className="lamp-glow-2" />
                    <div className="lamp-glow-3" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  )
}
