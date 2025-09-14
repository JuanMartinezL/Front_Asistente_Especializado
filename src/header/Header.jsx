import React, { useState } from 'react';
import { MessageSquare, Twitter, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Avatar from '../common/Avatar';
import ProfileMenu from '../profile/ProfileMenu';
import './Header.css';

const Header = ({ darkMode, onToggleDarkMode, user, onUpdateUser }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleUserUpdate = (userData) => {
    onUpdateUser(userData);
  };
  return (
    <header className={`header-container ${darkMode ? 'dark' : ''}`}>
      <div className="header-content">
        {/* Logo */}
        <div className="logo-section">
          <div className="logo-wrapper">
            <div className="logo-icon">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="logo-status"></div>
          </div>
          <div>
            <h1 className="logo-title">
              CUIDO
            </h1>
            <p className="logo-subtitle">Asistente Medico IA</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="header-right">
          {/* Social Media Links */}
          <div className="social-links">
            <a href="#" className="social-link" title="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="social-link" title="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="social-link" title="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="social-link" title="Mensajes">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
          
          <div className="divider"></div>
          
          {/* Status */}
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="status-text">En línea</span>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Avatar 
              size="md"
              name={user.name}
              image={user.avatar}
              onClick={toggleProfileMenu}
              darkMode={darkMode}
            />

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <ProfileMenu 
                onClose={() => setShowProfileMenu(false)} 
                darkMode={darkMode}
                onToggleDarkMode={onToggleDarkMode}
                user={user}
                onUpdateUser={handleUserUpdate}
              />
            )}
          </div>
        </div>
      </div>

      {/* Overlay to close profile menu */}
      {showProfileMenu && (
        <div 
          className="profile-overlay" 
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;