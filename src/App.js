import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext';
import Home from './pages/Home';
import Chat from './pages/Chat';
import './styles/App.css';

function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:contactId" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
