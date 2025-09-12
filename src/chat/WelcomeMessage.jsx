import React from 'react';
import { Stethoscope, Heart, Activity } from 'lucide-react';
import './WelcomeMessage.css';

const WelcomeMessage = ({ selectedCategory, onCategorySelect, darkMode }) => {
  const categories = [
    { 
      id: 'medical', 
      label: 'Consultas médicas', 
      icon: '🏥',
      description: 'Diagnósticos y consultas clínicas'
    },
    { 
      id: 'analysis', 
      label: 'Análisis de datos', 
      icon: '📊',
      description: 'Estadísticas y análisis de salud'
    },
    { 
      id: 'research', 
      label: 'Apoyo en investigación', 
      icon: '🔬',
      description: 'Investigación médica y estudios'
    },
    { 
      id: 'diagnosis', 
      label: 'Diagnóstico asistido', 
      icon: '🩺',
      description: 'IA para diagnóstico médico'
    },
    { 
      id: 'treatment', 
      label: 'Planes de tratamiento', 
      icon: '💊',
      description: 'Recomendaciones terapéuticas'
    }
  ];

  return (
    <div className={`welcome-container ${darkMode ? 'dark' : ''}`}>
      <div className="welcome-icons">
        <Heart className="w-6 h-6 text-red-500 animate-pulse" />
        <Stethoscope className="w-8 h-8 text-blue-700" />
        <Activity className="w-6 h-6 text-green-500 animate-pulse" />
      </div>
      
      <h1 className="welcome-title">
        ¿Qué quieres preguntar hoy?
      </h1>
      
      <p className="welcome-description">
        Asistente especializado en investigación médica y salud.
      </p>
      
      <div className="category-selection">
        <p className="category-instruction">Selecciona una opción:</p>
        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`category-button ${
                selectedCategory === category.id ? 'category-button-active' : 'category-button-inactive'
              }`}
            >
              <span className="category-icon">{category.icon}</span>
              <div className="category-content">
                <span className="category-label">{category.label}</span>
                <span className="category-description">{category.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;