import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import Header from './Header';
import Message from './Message';

const ChatWindow = ({ contactId }) => {
  const navigate = useNavigate();
  const { contacts, messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const contact = contacts.find(c => c.id === contactId);
  const contactMessages = messages[contactId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [contactMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(contactId, newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!contact) {
    return (
      <div className="chat-window">
        <Header title="Chat no encontrado" showBack onBack={handleBack} />
        <div className="chat-not-found">
          <p>No se pudo encontrar el chat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <Header 
        title={contact.name} 
        showBack 
        onBack={handleBack}
        contact={contact}
      />
      
      <div className="chat-messages">
        {contactMessages.length === 0 && (
          <div className="empty-chat">
            <div className="empty-chat__icon">💬</div>
            <p className="empty-chat__text">Envía un mensaje para comenzar la conversación</p>
          </div>
        )}
        
        {contactMessages.map(message => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <div className="input-container">
          <button type="button" className="emoji-button">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-4-6h8a4 4 0 11-8 0z"/>
            </svg>
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje"
            className="message-input"
          />
          {!newMessage.trim() ? (
            <div className="action-buttons">
              <button type="button" className="action-button">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
                </svg>
              </button>
              <button type="button" className="action-button">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M21 15v4c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-9-13c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
                </svg>
              </button>
            </div>
          ) : (
            <button type="submit" className="send-button">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
