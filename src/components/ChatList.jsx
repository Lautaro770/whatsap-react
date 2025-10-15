// src/components/ChatList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import Header from './Header';
import SearchBar from './SearchBar';
import ContactItem from './ContactItem';

const ChatList = () => {
  const navigate = useNavigate();
  const { contacts } = useChat();

  const handleContactClick = (contactId) => {
    navigate(`/chat/${contactId}`);
  };

  return (
    <div className="chat-list-container" role="main">
      <Header title="WhatsApp" />
      <SearchBar />
      
      <div className="contacts-list" role="list">
        {contacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onClick={() => handleContactClick(contact.id)}
            role="listitem"
          />
        ))}
        
        {contacts.length === 0 && (
          <div className="no-contacts" role="status">
            <p>No se encontraron conversaciones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;