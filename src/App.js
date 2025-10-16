import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext';
import Home from './pages/Home';
import Chat from './pages/Chat';
import './styles/App.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileView, setMobileView] = useState('list'); // 'list' or 'chat'

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getAppClassName = () => {
    if (!isMobile) return 'app';
    return `app mobile-${mobileView}-view`;
  };

  return (
    <ChatProvider>
      <Router>
        <div className={getAppClassName()}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
