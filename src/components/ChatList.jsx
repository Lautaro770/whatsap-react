import React from 'react';
import { useChat } from '../contexts/ChatContext';

const ChatList = () => {
  // CORREGIDO: Usar 'chats' directamente en lugar de 'getFilteredChats'
  const { chats, setCurrentChat, searchTerm } = useChat();

  return (
    <div className="chat-list">
      {chats && chats.length > 0 ? (
        chats.map(chat => (
          <div 
            key={chat.id} 
            className="contact-item"
            onClick={() => setCurrentChat(chat)}
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
          {searchTerm ? 'No se encontraron chats' : 'No hay chats disponibles'}
        </div>
      )}
    </div>
  );
};

export default ChatList;