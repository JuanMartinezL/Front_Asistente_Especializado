import React from 'react';
import { 
  Menu, 
  X, 
  MessageSquare, 
  History, 
  FileText, 
  Settings, 
  HelpCircle,
  Database,
  BarChart3,
  Users,
  Shield
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onToggle }) => {
  const menuItems = [
    { icon: MessageSquare, label: 'Nueva Consulta', active: true },
    { icon: History, label: 'Historial', count: 12 },
    { icon: FileText, label: 'Documentos', count: 8 },
    { icon: Database, label: 'Base de Datos' },
    { icon: BarChart3, label: 'Análisis' },
    { icon: Users, label: 'Pacientes' },
    { icon: Shield, label: 'Privacidad' },
    { icon: Settings, label: 'Configuración' },
    { icon: HelpCircle, label: 'Ayuda' },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button onClick={onToggle} className="sidebar-toggle">
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-content">
          {/* Header */}
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="sidebar-logo-icon">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="sidebar-title">Panel de Control</h2>
                <p className="sidebar-subtitle">Investigación Médica</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="sidebar-menu">
            <nav className="sidebar-nav">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={`sidebar-item ${item.active ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
                >
                  <item.icon className="sidebar-item-icon" />
                  <span className="sidebar-item-label">{item.label}</span>
                  {item.count && (
                    <span className="sidebar-item-count">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="sidebar-footer">
            <div className="sidebar-project-info">
              <h3 className="sidebar-project-title">
                Proyecto de Investigación
              </h3>
              <p className="sidebar-project-description">
                Sistema de IA para análisis médico y apoyo en diagnóstico
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;