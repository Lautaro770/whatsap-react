// src/components/ContactItem.jsx
import React from 'react';

const ContactItem = ({ contact, isSelected, onClick }) => {
  const formatTime = (timestamp) => {
    return timestamp;
  };

  return (
    <div 
      className={`contact-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Conversación con ${contact.name}. ${contact.lastMessage}`}
    >
      <div className="contact-avatar" aria-hidden="true">
        {contact.avatar}
        {contact.online && <span className="online-indicator" aria-label="En línea"></span>}
      </div>
      
      <div className="contact-info">
        <div className="contact-header">
          <h3 className="contact-name">{contact.name}</h3>
          <span className="message-time">{formatTime(contact.timestamp)}</span>
        </div>
        
        <div className="contact-preview">
          <p className="last-message">{contact.lastMessage}</p>
          {contact.unread > 0 && (
            <span className="unread-badge" aria-label={`${contact.unread} mensajes no leídos`}>
              {contact.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;