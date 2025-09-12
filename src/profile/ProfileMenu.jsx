import React from 'react';
import { Settings, Moon, Sun, LogOut } from 'lucide-react';
import Avatar from '../common/Avatar';
import './ProfileMenu.css';

const ProfileMenu = ({ onClose, darkMode, onToggleDarkMode, user, onUpdateUser }) => {
  const handleSettingsClick = () => {
    console.log('Abrir configuración');
    onClose();
  };

  const handleDarkModeClick = () => {
    onToggleDarkMode();
  };

  const handleLogoutClick = () => {
    console.log('Cerrar sesión');
    localStorage.clear();
    onClose();
  };

  const handleEditProfile = () => {
    const newName = prompt('Ingrese su nombre:', user.name);
    const newRole = prompt('Ingrese su rol:', user.role);
    const newEmail = prompt('Ingrese su email:', user.email);
    
    if (newName && newRole && newEmail) {
      onUpdateUser({
        ...user,
        name: newName,
        role: newRole,
        email: newEmail
      });
    }
    onClose();
  };
  return (
    <div className={`profile-menu ${darkMode ? 'dark' : ''}`}>
      <div className="profile-header">
        <Avatar size="lg" name={user.name} image={user.avatar} darkMode={darkMode} />
        <div className="profile-info">
          <h3 className="profile-name">{user.name}</h3>
          <p className="profile-role">{user.role}</p>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
      
      <div className="profile-actions">
        <button onClick={handleEditProfile} className="profile-action-button">
          <Settings className="w-4 h-4" />
          <span>Editar perfil</span>
        </button>
        <button onClick={handleDarkModeClick} className="profile-action-button">
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{darkMode ? 'Modo claro' : 'Modo oscuro'}</span>
        </button>
        <button onClick={handleLogoutClick} className="profile-action-button logout">
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;