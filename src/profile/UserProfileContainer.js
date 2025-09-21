import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileMenu from './ProfileMenu/ProfileMenu';

const UserProfileContainer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. OBTENER DATOS DEL USUARIO con Fetch (GET)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://tu-api.com/usuario/1');

        // CAMBIO 1: Fetch no considera errores HTTP (404, 500) como qun fallo.
        // Debemos verificar la respuesta manualmente.
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue exitosa.');
        }

        // CAMBIO 2: Debemos convertir manualmente la respuesta a JSON.
        const data = await response.json();
        setUser(data);

      } catch (err) {
        setError('Error al cargar el usuario.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // 2. ACTUALIZAR DATOS DEL USUARIO con Fetch (PUT)
  const handleUpdateUser = async (updatedUserData) => {
    try {
      const response = await fetch(`https://tu-api.com/usuario/${user.id}`, {
        // CAMBIO 3: Debemos especificar el método, las cabeceras y el cuerpo.
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData), // El cuerpo debe ser un string JSON
      });

      if (!response.ok) {
        throw new Error('No se pudo actualizar el perfil.');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      alert('¡Perfil actualizado con éxito!');

    } catch (err) {
      console.error('Error al actualizar el perfil:', err);
      alert('No se pudo actualizar el perfil.');
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) return <div>Cargando perfil...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-profile-widget">
      <ProfileHeader 
        user={user} 
        isMenuOpen={isMenuOpen} 
        onToggle={handleToggleMenu} 
      />

      {isMenuOpen && (
        <ProfileMenu
          user={user}
          onClose={() => setIsMenuOpen(false)}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default UserProfileContainer;