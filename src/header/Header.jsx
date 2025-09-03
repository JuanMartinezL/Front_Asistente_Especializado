import React, { useState } from 'react';
import { MessageSquare, Twitter, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Avatar from '../common/Avatar';
import ProfileMenu from '../profile/ProfileMenu';
import './Header.css';

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className="header-container">
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
              Asistente de Salud
            </h1>
            <p className="logo-subtitle">Investigación Médica IA</p>
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
            <a href="#" className="social-link" title="WhatsApp">
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
              name="Dr. María González"
              onClick={toggleProfileMenu}
            />

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <ProfileMenu onClose={() => setShowProfileMenu(false)} />
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