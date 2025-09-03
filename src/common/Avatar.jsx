import React from 'react';
import { User } from 'lucide-react';
import './Avatar.css';

const Avatar = ({ 
  size = 'md', 
  name = 'Usuario', 
  image, 
  status,
  onClick 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500'
  };

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`${sizeClasses[size]} bg-blue-700 rounded-full flex items-center justify-center avatar-button`}
      >
        {image ? (
          <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <User className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-7 h-7'} text-white`} />
        )}
      </button>
      
      {status && (
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusColors[status]} rounded-full border-2 border-white`}></div>
      )}
    </div>
  );
};

export default Avatar;