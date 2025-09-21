import React, { useState, useEffect } from 'react';
import { Header } from './header';
import { WelcomeMessage, ChatInput } from './chat';
import { Sidebar } from './sidebar';

function App() {
  // --- Estados de UI ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('healthAssistant_darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // --- Estados de datos ---
  const [user, setUser] = useState(null); // Empezará como nulo hasta que se cargue
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // Para saber qué chat se muestra
  const [loading, setLoading] = useState(true); // Estado de carga inicial
  const [error, setError] = useState(null); // Estado para errores

  // 1. Cargar todos los datos desde la API al iniciar la aplicación
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [userResponse, historyResponse] = await Promise.all([
          fetch('https://tu-api.com/usuario/1'), // Endpoint para datos del usuario
          fetch('https://tu-api.com/usuario/1/chats')  // Endpoint para el historial
        ]);

        if (!userResponse.ok || !historyResponse.ok) {
          throw new Error('No se pudieron cargar los datos iniciales.');
        }

        const userData = await userResponse.json();
        const historyData = await historyResponse.json();

        setUser(userData);
        setChatHistory(historyData);
      } catch (err) {
        setError(err.message);
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []); 

  // Guardar el modo oscuro en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('healthAssistant_darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  // --- Funciones para manejar el estado ---

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // 2. Función para actualizar el usuario en el frontend y backend
  const updateUser = async (updatedUserData) => {
    // Actualización optimista: cambia la UI primero para una mejor experiencia
    const previousUser = user;
    setUser(updatedUserData); 

    try {
      const response = await fetch(`https://tu-api.com/usuario/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUserData)
      });

      if (!response.ok) {
        throw new Error('No se pudo guardar en el servidor.');
      }
      // Opcional: puedes actualizar el estado con la respuesta del servidor si devuelve datos nuevos
      const savedUser = await response.json();
      setUser(savedUser);

    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      setUser(previousUser); // Si falla, revierte al estado anterior
      alert("No se pudo actualizar el perfil. Inténtalo de nuevo.");
    }
  };

  // 3. Función para seleccionar y mostrar un chat del historial
  const selectChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    setActiveChat(chat);
  };

  // 4. Función para iniciar un nuevo chat
  const startNewChat = () => {
    setActiveChat(null); // O un objeto de chat nuevo: { id: 'new', messages: [] }
  };
  
  // La función para enviar un mensaje ahora debería guardar en la API
  const handleMessageSubmit = async (messageContent) => {
    // Lógica para enviar el nuevo mensaje a la API y actualizar el historial de chat
    console.log('Enviando mensaje a la API:', messageContent);
    // POST /api/chats/{chatId}/messages
    // Después de la respuesta exitosa, se vuelve a pedir el historial o se actualiza localmente.
  };

  // --- Renderizado condicional ---
  if (loading) return <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen flex items-center justify-center' : 'min-h-screen flex items-center justify-center'}>Cargando asistente...</div>;
  if (error) return <div className={darkMode ? 'dark bg-gray-900 text-red-400 min-h-screen flex items-center justify-center' : 'text-red-600 min-h-screen flex items-center justify-center'}>Error: {error}</div>;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* 5. Los componentes hijos ahora reciben los datos y funciones desde el estado del padre */}
      <Header 
        darkMode={darkMode} 
        onToggleDarkMode={toggleDarkMode}
        user={user}
        onUpdateUser={updateUser}
      />
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar} 
        chatHistory={chatHistory}
        onSelectChat={selectChat} // <--- Pasamos la nueva función
        darkMode={darkMode}
        onNewChat={startNewChat}
        userProfile={{ email: user.email, plan: user.plan }} // <--- Pasamos los datos del perfil
      />
      
      <main className={`pt-8 pb-32 px-4 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : ''}`}>
        <div className={`max-w-4xl mx-auto min-h-[calc(100vh-200px)] flex flex-col ${darkMode ? 'dark' : ''}`}>
          {activeChat ? (
            // Aquí renderizarías los mensajes del chat activo
            <div>
              <h2 className={darkMode ? 'text-white' : 'text-black'}>{activeChat.title}</h2>
              {/* Mapear activeChat.messages y mostrarlos */}
            </div>
          ) : (
            <WelcomeMessage darkMode={darkMode} />
          )}
        </div>
      </main>

      <div className={darkMode ? 'dark' : ''}>
        <ChatInput 
          darkMode={darkMode} 
          onMessageSubmit={handleMessageSubmit}
        />
      </div>
    </div>
  );
}

export default App;