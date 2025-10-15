import React from 'react';

const Header = ({ title, showBack, onBack, contact }) => {
  return (
    <div className="chat-header">
      {showBack && (
        <button className="back-button" onClick={onBack}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"/>
          </svg>
        </button>
      )}
      <div className="contact-avatar">
        <div className="avatar">
          {contact?.name?.charAt(0) || 'U'}
        </div>
      </div>
      <div className="chat-header__info">
        <h2 className="chat-header__title">{title}</h2>
        {contact && (
          <span className="chat-header__status">
            {contact.online ? 'En línea' : `Visto por última vez ${contact.lastSeen}`}
          </span>
        )}
      </div>
      <div className="chat-header__actions">
        <button className="header-button" title="Video llamada">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M18 10.5V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.5l4 4v-11l-4 4z"/>
          </svg>
        </button>
        <button className="header-button" title="Llamada de voz">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
          </svg>
        </button>
        <button className="header-button" title="Más opciones">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
