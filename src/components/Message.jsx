import React from 'react';

const Message = ({ message }) => {
  const isMe = message.sender === 'me';

  const getDeliveryStatus = () => {
    if (!isMe) return null;
    
    if (message.seen) {
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#53bdeb">
          <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
        </svg>
      );
    } else if (message.delivered) {
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#8696a0">
          <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#8696a0">
          <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
        </svg>
      );
    }
  };

  return (
    <div className={`message ${isMe ? 'message--me' : 'message--them'}`}>
      <div className="message__bubble">
        <p className="message__text">{message.text}</p>
        <div className="message__meta">
          <span className="message__time">{message.timestamp}</span>
          {isMe && <span className="message__status">{getDeliveryStatus()}</span>}
        </div>
      </div>
    </div>
  );
};

export default Message;
