// src/components/Message.jsx
import React from 'react';

const Message = ({ message, isOwn }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div 
      className={`message ${isOwn ? 'own-message' : 'other-message'}`}
      role="listitem"
      aria-label={`${isOwn ? 'Tú' : 'Contacto'} dijo: ${message.text} a las ${formatTime(message.timestamp)}`}
    >
      <div className="message-bubble">
        <p className="message-text">{message.text}</p>
        <span className="message-time" aria-hidden="true">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default Message;