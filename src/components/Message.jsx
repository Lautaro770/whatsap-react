import React from 'react';

const Message = ({ message }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message ${message.isSent ? 'message-sent' : 'message-received'}`}>
      <div className="message-text">{message.text}</div>
      <div className="message-time">{formatTime(message.timestamp)}</div>
    </div>
  );
};

export default Message;
