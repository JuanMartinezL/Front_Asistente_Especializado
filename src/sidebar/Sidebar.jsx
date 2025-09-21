import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  MessageSquare, 
  Search,
  Settings, 
  HelpCircle,
  CreditCard,
  Plus
} from 'lucide-react';
import './Sidebar.css';

// 1. Recibe las nuevas props del padre: `userProfile` y `onSelectChat`.
const Sidebar = ({ 
  isOpen, 
  onToggle, 
  userProfile, 
  chatHistory, 
  onSelectChat, 
  onNewChat,
  darkMode 
}) => {
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
      {/* Botón para abrir/cerrar el sidebar */}
      <button onClick={onToggle} className={`sidebar-toggle ${darkMode ? 'dark' : ''}`}>
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay que aparece cuando el sidebar está abierto */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}

      {/* Contenido del Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'} modern-sidebar`}>
        <div className="sidebar-content">
          
          {/* ... (Header y logo no cambian) ... */}
          <div className="sidebar-header-modern">
            <div className="sidebar-logo-modern">
              <span className="logo-text">bolt</span>
            </div>
          </div>

          {/* Botón de Nuevo Chat */}
          <div className="new-chat-section">
            <button onClick={onNewChat} className="new-chat-button">
              <Plus className="w-4 h-4" />
              <span>Iniciar un nuevo chat</span>
            </button>
          </div>

          {/* ... (Sección de búsqueda no cambia) ... */}
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

          {/* Historial de Chats */}
          <div className="chat-history-modern">
            <h3 className="chat-history-title-modern">Tus chats</h3>
            {filteredChats.map((chat) => (
              // 2. Se añade el evento `onClick` para notificar al padre qué chat se seleccionó.
              <button 
                key={chat.id} 
                className="chat-history-item-modern"
                onClick={() => onSelectChat(chat.id)}
              >
                <MessageSquare className="w-4 h-4 chat-icon" />
                <span className="chat-title-text">{chat.title}</span>
              </button>
            ))}
          </div>

          {/* ... (Items del menú no cambian) ... */}
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

          {/* Perfil de Usuario */}
          <div className="user-profile-section">
            <div className="user-profile-info">
              <div className="user-avatar">
                <div className="avatar-circle">
                  {/* Muestra la inicial del correo si está disponible */}
                  <span className="avatar-initial">
                    {userProfile ? userProfile.email.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
              </div>
              <div className="user-details">
                {/* 3. Muestra los datos del perfil recibidos por props. */}
                {userProfile ? (
                  <>
                    <div className="user-email">{userProfile.email}</div>
                    <div className="user-plan">{userProfile.plan || 'Plan no definido'}</div>
                  </>
                ) : (
                  <div className="user-email">Cargando...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;