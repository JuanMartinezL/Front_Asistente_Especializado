import React, { useState } from 'react';
import { Header } from './header';
import { WelcomeMessage, ChatInput } from './chat';
import { Sidebar } from './sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <main className={`pt-8 pb-32 px-4 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : ''}`}>
        <div className="max-w-4xl mx-auto min-h-[calc(100vh-200px)] flex flex-col justify-center bg-white">
          <WelcomeMessage 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </main>

      <div className="bg-white">
        <ChatInput />
      </div>
    </div>
  );
}

export default App;