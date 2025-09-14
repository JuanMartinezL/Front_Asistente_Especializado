// src/components/ProfileHeader/ProfileHeader.js

import React, { useState, useEffect } from 'react'; // 1. Importa useState y useEffect
import axios from 'axios';                         // 2. Importa axios
import { ChevronDown } from 'lucide-react';
import Avatar from '../common/Avatar';
import './ProfileHeader.css';

const ProfileHeader = ({ isMenuOpen, onToggle }) => {
  // 3. Define los estados para manejar los datos, la carga y los errores
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 4. Usa useEffect para realizar la petición a la API una sola vez
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        // Reemplaza esta URL con la de tu API real
        const respuesta = await axios.get('https://tu-api.com/usuario/1');
        setUsuario(respuesta.data); // Guarda los datos del usuario en el estado
      } catch (err) {
        setError('No se pudo cargar la información del perfil.'); // Maneja el error
        console.error(err);
      } finally {
        setCargando(false); // Deja de cargar, tanto si hubo éxito como si hubo error
      }
    };

    fetchUsuario();
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez al montar el componente

  // 5. Renderizado condicional basado en el estado de la carga y el error
  if (cargando) {
    return <div className="profile-header-button">Cargando...</div>;
  }

  if (error) {
    return <div className="profile-header-button">{error}</div>;
  }

  // 6. Si todo salió bien, muestra el componente con los datos dinámicos
  return (
    <button onClick={onToggle} className="profile-header-button">
      {/* Usamos el nombre del usuario que viene de la API */}
      <Avatar size="md" name={usuario.nombre} status="online" />
      <ChevronDown className={`profile-chevron ${isMenuOpen ? 'profile-chevron-open' : ''}`} />
    </button>
  );
};

export default ProfileHeader;