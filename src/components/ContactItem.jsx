import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';

const ContactItem = ({ contact }) => {
  const navigate = useNavigate();
  const { setCurrentContact } = useChat();

  const handleClick = () => {
    setCurrentContact(contact);
    console.log('Navigating to chat with:', contact.id, contact.name);
    navigate(`/chat/${contact.id}`);
  };

  return (
    <div className="contact-item" onClick={handleClick}>
      <div className="contact-item__avatar">
        <div className="avatar">
          {contact.name.charAt(0)}
        </div>
        {contact.online && <div className="online-indicator"></div>}
      </div>
      
      <div className="contact-item__info">
        <div className="contact-item__header">
          <h3 className="contact-item__name">{contact.name}</h3>
          <span className="contact-item__time">{contact.timestamp}</span>
        </div>
        
        <div className="contact-item__preview">
          <p className="contact-item__message">{contact.lastMessage}</p>
          {contact.unread > 0 && (
            <span className="unread-badge">{contact.unread}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
