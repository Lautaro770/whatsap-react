// src/components/Header.jsx
import React from 'react';
import { useChat } from '../contexts/ChatContext';

const Header = ({ title, onBack, showBack = false }) => {
  const { currentUser } = useChat();

  return (
    <header className="header" role="banner">
      {showBack && (
        <button 
          className="back-button" 
          onClick={onBack}
          aria-label="Volver atrás"
        >
          ←
        </button>
      )}
      <h1 className="header-title">{title}</h1>
      {currentUser && (
        <span className="user-avatar" aria-label={`Usuario: ${currentUser.name}`}>
          {currentUser.avatar}
        </span>
      )}
    </header>
  );
};

export default Header;