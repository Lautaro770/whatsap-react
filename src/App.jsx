import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext';
import SidebarNav from './components/SidebarNav';
import Main from './pages/Main';
import Chat from './pages/Chat';
import './styles/App.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileView, setMobileView] = useState('list');

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
  }, 
  [location.pathname, isMobile]);
  const getAppClassName = () => {
    if (!isMobile) return 'app';
    return 'app mobile-' + mobileView + '-view';
  };

  return (
    <ChatProvider>
      <Router>
        <div className={getAppClassName()}>
            {!isMobile && <SidebarNav />}
                <div className="app-content"></div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </ChatProvider>
  );
}

