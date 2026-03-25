import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="custom-footer">
      <p>© {currentYear} EcoTrack - Sustainable Living Tracker</p>
      <p>
        Built with <span className="footer-heart">♥</span> for a greener tomorrow
      </p>
      <p style={{ fontSize: '12px', marginTop: '16px', opacity: 0.6 }}>
        Developed as part of Internal Assessment Project
      </p>
    </div>
  );
}
