import React from 'react';
import { Settings, Moon, LogOut } from 'lucide-react';
import Avatar from '../common/Avatar';
import './ProfileMenu.css';

interface ProfileMenuProps {
  onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onClose }) => {
  const handleSettingsClick = () => {
    console.log('Abrir configuración');
    onClose();
  };

  const handleDarkModeClick = () => {
    console.log('Cambiar modo oscuro');
    onClose();
  };

  const handleLogoutClick = () => {
    console.log('Cerrar sesión');
    onClose();
  };

  return (
    <div className="profile-menu">
      <div className="profile-header">
        <Avatar size="lg" name="Dr. María González" status="online" />
        <div className="profile-info">
          <h3 className="profile-name">Dr. María González</h3>
          <p className="profile-role">Investigadora Principal</p>
          <p className="profile-email">maria.gonzalez@hospital.com</p>
        </div>
      </div>
      
      <div className="profile-actions">
        <button onClick={handleSettingsClick} className="profile-action-button">
          <Settings className="w-4 h-4" />
          <span>Administrar cuenta</span>
        </button>
        <button onClick={handleDarkModeClick} className="profile-action-button">
          <Moon className="w-4 h-4" />
          <span>Modo oscuro</span>
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