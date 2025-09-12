import React from 'react';
import { ChevronDown } from 'lucide-react';
import Avatar from '../common/Avatar';
import './ProfileHeader.css';

interface ProfileHeaderProps {
  isMenuOpen: boolean;
  onToggle: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isMenuOpen, onToggle }) => {
  return (
    <button onClick={onToggle} className="profile-header-button">
      <Avatar size="md" name="Dr. María González" status="online" />
      <ChevronDown className={`profile-chevron ${isMenuOpen ? 'profile-chevron-open' : ''}`} />
    </button>
  );
};

export default ProfileHeader;