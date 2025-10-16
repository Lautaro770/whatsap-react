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
      
      // Reset mobileView cuando cambia de móvil a desktop
      if (!mobile) {
        setMobileView('list');
      } else {
        // En móvil, determinar la vista basada en la ruta actual
        if (location.pathname === '/') {
          setMobileView('list');
        } else if (location.pathname.startsWith('/chat/')) {
          setMobileView('chat');
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // Ejecutar una vez al montar
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobile) {
      if (location.pathname === '/') {
        setMobileView('list');
      } else if (location.pathname.startsWith('/chat/')) {
        setMobileView('chat');
      }
    } else {
      // En desktop, siempre mostrar ambas vistas
      setMobileView('desktop');
    }
  }, [location.pathname, isMobile]);

  const getAppClassName = () => {
    if (!isMobile) return 'app desktop-view';
    return 'app mobile-' + mobileView + '-view';
  };

  return (
    <div className={getAppClassName()}>
      {/* Barra de navegación lateral - solo en desktop */}
      {!isMobile && <SidebarNav />}
      
      {/* Contenido principal */}
      <div className="app-content">
        {/* Sidebar con lista de chats - siempre visible en desktop, condicional en mobile */}
        {(!isMobile || mobileView === 'list') && (
          <div className="sidebar">
            <Main />
          </div>
        )}
        
        {/* Panel derecho - Solo muestra Chat cuando hay uno seleccionado */}
        <div className="right-panel">
          <Routes>
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/" element={null} />
          </Routes>
        </div>
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