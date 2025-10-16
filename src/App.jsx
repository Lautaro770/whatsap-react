import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext';
import SidebarNav from './components/SidebarNav';
import Main from './pages/Main';
import Chat from './pages/Chat';
import './styles/App.css';

function AppContent() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileView, setMobileView] = useState('list');
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (location.pathname === '/') {
        setMobileView('list');
      } else if (location.pathname.startsWith('/chat/')) {
        setMobileView('chat');
      }
    }
  }, [location.pathname, isMobile]);

  const getAppClassName = () => {
    if (!isMobile) return 'app';
    return \pp mobile-\-view\;
  };

  // Verificar si hay chat seleccionado
  const isChatSelected = location.pathname.startsWith('/chat/');

  return (
    <div className={getAppClassName()}>
      {/* Barra de navegación lateral - solo en desktop */}
      {!isMobile && <SidebarNav />}
      
      {/* Contenido principal */}
      <div className=\"app-content\">
        {/* Sidebar con lista de chats - siempre visible en desktop, condicional en mobile */}
        {(!isMobile || mobileView === 'list') && (
          <div className=\"sidebar\">
            <Main />
          </div>
        )}
        
        {/* Chat window - visible cuando hay chat seleccionado */}
        {isChatSelected && (
          <div className=\"chat-container\">
            <Chat />
          </div>
        )}
        
        {/* Panel "selecciona un chat" - solo en desktop cuando no hay chat */}
        {!isMobile && !isChatSelected && (
          <div className=\"no-chat-selected-panel\">
            <div className=\"no-chat-content\">
              <div className=\"no-chat-icon\">💬</div>
              <h2>WhatsApp Web</h2>
              <p>Envía y recibe mensajes sin necesidad de tener tu teléfono conectado.</p>
              <div className=\"no-chat-features\">
                <div className=\"feature\">
                  <span>🔒</span>
                  <span>Usa WhatsApp en hasta 4 dispositivos vinculados y 1 teléfono a la vez.</span>
                </div>
                <div className=\"feature\">
                  <span>🖥️</span>
                  <span>Experimenta una app de escritorio rápida y sincronizada.</span>
                </div>
              </div>
              <div className=\"no-chat-footer\">
                <span>Tu información personal está protegida con cifrado de extremo a extremo.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <Router>
        <AppContent />
      </Router>
    </ChatProvider>
  );
}

export default App;
