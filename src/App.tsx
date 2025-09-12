import React, { useState } from 'react';
import { useEffect } from 'react';
import { Header } from './header';
import { WelcomeMessage, ChatInput } from './chat';
import { Sidebar } from './sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [user, setUser] = useState({
    name: 'Dr. María González',
    role: 'Investigadora Principal',
    email: 'maria.gonzalez@hospital.com',
    avatar: null
  });
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'Consulta sobre diabetes', date: '2024-01-15', messages: [] },
    { id: 2, title: 'Análisis de presión arterial', date: '2024-01-14', messages: [] },
    { id: 3, title: 'Investigación cardiovascular', date: '2024-01-13', messages: [] }
  ]);

  // Cargar datos del usuario y configuraciones al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('healthAssistant_user');
    const savedDarkMode = localStorage.getItem('healthAssistant_darkMode');
    const savedChatHistory = localStorage.getItem('healthAssistant_chatHistory');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }
  }, []);

  // Guardar configuraciones cuando cambien
  useEffect(() => {
    localStorage.setItem('healthAssistant_darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('healthAssistant_chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Guardar chat cuando se cierre la página
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentMessage.trim()) {
        saveCurrentChat();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentMessage]);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('healthAssistant_user', JSON.stringify(userData));
  };

  const saveCurrentChat = () => {
    if (currentMessage.trim()) {
      const newChat = {
        id: Date.now(),
        title: currentMessage.substring(0, 50) + (currentMessage.length > 50 ? '...' : ''),
        date: new Date().toISOString().split('T')[0],
        messages: [{ type: 'user', content: currentMessage, timestamp: new Date() }]
      };
      
      setChatHistory(prev => [newChat, ...prev.slice(0, 4)]);
      setCurrentMessage('');
    }
  };

  const startNewChat = () => {
    if (currentMessage.trim()) {
      saveCurrentChat();
    }
    setSelectedCategory('');
  };

  const handleMessageSubmit = (message) => {
    setCurrentMessage(message);
    console.log('Procesando consulta médica:', message);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
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
        darkMode={darkMode}
        onNewChat={startNewChat}
      />
      
      <main className={`pt-8 pb-32 px-4 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : ''}`}>
        <div className={`max-w-4xl mx-auto min-h-[calc(100vh-200px)] flex flex-col justify-center ${darkMode ? 'dark' : ''}`}>
          <WelcomeMessage 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            darkMode={darkMode}
          />
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