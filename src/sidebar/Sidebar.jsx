import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  MessageSquare, 
  Search,
  History, 
  Settings, 
  HelpCircle,
  Shield,
  CreditCard,
  User,
  LogOut,
  Plus
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onToggle, chatHistory, darkMode, onNewChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems = [
    { icon: Settings, label: 'Ajustes' },
    { icon: HelpCircle, label: 'Centro de ayuda' },
    { icon: CreditCard, label: 'Mi suscripción' },
  ];

  const handleMenuClick = (item) => {
    console.log(`Navegando a: ${item.label}`);
  };

  const filteredChats = chatHistory?.filter(chat => 
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <>
      {/* Toggle Button */}
      <button onClick={onToggle} className={`sidebar-toggle ${darkMode ? 'dark' : ''}`}>
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'} modern-sidebar`}>
        <div className="sidebar-content">
          {/* Header with logo */}
          <div className="sidebar-header-modern">
            <div className="sidebar-logo-modern">
              <span className="logo-text">bolt</span>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="new-chat-section">
            <button onClick={onNewChat} className="new-chat-button">
              <Plus className="w-4 h-4" />
              <span>Iniciar un nuevo chat</span>
            </button>
          </div>

          {/* Search */}
          <div className="search-section">
            <div className="search-input-wrapper">
              <Search className="w-4 h-4 search-icon" />
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Chat History */}
          <div className="chat-history-modern">
            <h3 className="chat-history-title-modern">Tus chats</h3>
            
            {/* Today Section */}
            <div className="chat-group">
              <div className="chat-group-title">Hoy</div>
              {filteredChats.slice(0, 1).map((chat) => (
                <button key={chat.id} className="chat-history-item-modern">
                  <MessageSquare className="w-4 h-4 chat-icon" />
                  <span className="chat-title-text">{chat.title}</span>
                </button>
              ))}
            </div>

            {/* Previous chats */}
            {filteredChats.slice(1).map((chat) => (
              <button key={chat.id} className="chat-history-item-modern">
                <MessageSquare className="w-4 h-4 chat-icon" />
                <span className="chat-title-text">{chat.title}</span>
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="sidebar-menu-modern">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item)}
                className="sidebar-item-modern"
              >
                <item.icon className={`sidebar-item-icon-modern ${item.color || 'text-gray-400'}`} />
                <span className="sidebar-item-label-modern">{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Profile */}
          <div className="user-profile-section">
            <div className="user-profile-info">
              <div className="user-avatar">
                <div className="avatar-circle">
                  <span className="avatar-initial">C</span>
                </div>
              </div>
              <div className="user-details">
                <div className="user-email">correobasura701@gmail.com</div>
                <div className="user-plan">Plan personal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;