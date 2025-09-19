import React from 'react';
import { ChevronDown } from 'lucide-react';
import Avatar from '../common/Avatar';
import './ProfileHeader.css';

const ProfileHeader = ({ isMenuOpen, onToggle }) => {
  return (
    <button onClick={onToggle} className="profile-header-button">
      <Avatar size="md" name={user.name} status="online" />
      <ChevronDown className={`profile-chevron ${isMenuOpen ? 'profile-chevron-open' : ''}`} />
    </button>
  );
};

export default ProfileHeader;