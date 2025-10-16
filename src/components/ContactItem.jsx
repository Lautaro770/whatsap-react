import React from 'react';
import { useChat } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';

const ContactItem = ({ chat, isActive }) => {
  const { setCurrentChat } = useChat();
  const navigate = useNavigate();

  const handleClick = () => {
    setCurrentChat(chat);
    navigate(`/chat/${chat.id}`);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getLastMessage = () => {
    const messages = chat.messages;
    return messages.length > 0 ? messages[messages.length - 1].text : 'No hay mensajes';
  };

  const getLastMessageTime = () => {
    const messages = chat.messages;
    return messages.length > 0 ? formatTime(messages[messages.length - 1].timestamp) : '';
  };

  return (
    <div 
      className={`contact-item ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="contact-avatar">
        {chat.avatar}
      </div>
      <div className="contact-info">
        <div className="contact-header">
          <div className="contact-name">{chat.name}</div>
          <div className="contact-time">{getLastMessageTime()}</div>
        </div>
        <div className="last-message">{getLastMessage()}</div>
      </div>
    </div>
  );
};

export default ContactItem;
