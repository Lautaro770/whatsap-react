// src/components/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import Header from './Header';
import Message from './Message';

const ChatWindow = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { contacts, messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const contact = contacts.find(c => c.id === contactId);
  const chatMessages = messages[contactId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(contactId, newMessage);
      setNewMessage('');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!contact) {
    return (
      <div className="chat-window-container">
        <Header title="Chat no encontrado" showBack onBack={handleBack} />
        <div className="chat-not-found">
          <p>No se pudo encontrar la conversación</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window-container" role="main">
      <Header 
        title={contact.name} 
        showBack 
        onBack={handleBack}
      />
      
      <div className="messages-container" role="log" aria-live="polite">
        {chatMessages.map(message => (
          <Message
            key={message.id}
            message={message}
            isOwn={message.sender === 'me'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="message-form" role="form">
        <div className="message-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="message-input"
            aria-label="Escribe un mensaje"
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={!newMessage.trim()}
            aria-label="Enviar mensaje"
          >
            📤
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;