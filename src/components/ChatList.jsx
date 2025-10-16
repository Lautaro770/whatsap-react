import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';

const ChatList = () => {
  const { chats, setCurrentChat } = useChat();
  const navigate = useNavigate();

  const handleChatClick = (chat) => {
    console.log('🎯 Chat clickeado:', chat.name, 'ID:', chat.id);
    // 1. Establecer el chat actual en el contexto
    setCurrentChat(chat);
    // 2. Navegar a la ruta del chat
    navigate(`/chat/${chat.id}`);
  };

  return (
    <div className="chat-list">
      {chats && chats.length > 0 ? (
        chats.map(chat => (
          <div 
            key={chat.id} 
            className="contact-item"
            onClick={() => handleChatClick(chat)}
          >
            <div className="contact-avatar">
              {chat.avatar}
            </div>
            <div className="contact-info">
              <div className="contact-header">
                <div className="contact-name">{chat.name}</div>
                <div className="contact-time">{chat.timestamp}</div>
              </div>
              <div className="last-message">{chat.lastMessage}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-chats">
          No hay chats disponibles
        </div>
      )}
    </div>
  );
};

export default ChatList;