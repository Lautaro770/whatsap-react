import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentChat, setCurrentChat, chats, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Encontrar el chat cuando cambia el ID o los chats
  useEffect(() => {
    if (id && chats.length > 0) {
      const foundChat = chats.find(chat => chat.id === id);
      if (foundChat) {
        setCurrentChat(foundChat);
      }
    }
  }, [id, chats, setCurrentChat]);

  // Scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    sendMessage(currentChat.id, newMessage);
    setNewMessage('');
  };

  const handleBack = () => {
    setCurrentChat(null);
    navigate('/');
  };

  // Si no hay chat actual, mostrar loading
  if (!currentChat) {
    return (
      <div className="chat-window">
        <div className="chat-header">
          <button className="back-button" onClick={handleBack}>
            ←
          </button>
          <div>Cargando chat...</div>
        </div>
        <div className="messages-container">
          <p>Selecciona un chat para comenzar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      {/* Header del Chat */}
      <div className="chat-header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <div className="chat-header-info">
          <div className="chat-contact-name">{currentChat.name}</div>
          <div className="chat-contact-status">En línea</div>
        </div>
        <div className="chat-header-actions">
          <span>📹</span>
          <span>📞</span>
          <span>⋮</span>
        </div>
      </div>

      {/* Mensajes */}
      <div className="messages-container">
        {currentChat.messages && currentChat.messages.length > 0 ? (
          currentChat.messages.map(message => (
            <div
              key={message.id}
              className={`message ${message.isSent ? 'message-sent' : 'message-received'}`}
            >
              <div className="message-text">{message.text}</div>
              <div className="message-time">{message.timestamp}</div>
            </div>
          ))
        ) : (
          <div className="no-messages">
            <p>No hay mensajes aún. ¡Envía el primero!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de mensaje */}
      <div className="message-input">
        <div className="input-actions">
          <span>😊</span>
          <span>📎</span>
          <span>📷</span>
        </div>
        <form className="message-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Escribe un mensaje"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="send-button">
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;