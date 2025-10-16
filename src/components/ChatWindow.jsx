import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import Message from './Message';
import { FaPaperPlane, FaSmile, FaPaperclip, FaMicrophone } from 'react-icons/fa';

const ChatWindow = () => {
  const { id } = useParams();
  const { chats, sendMessage } = useChat();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const currentChat = chats.find(chat => chat.id === id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim() && currentChat) {
      sendMessage(currentChat.id, messageText);
      setMessageText('');
    }
  };

  if (!currentChat) {
    return (
      <div className="chat-window">
        <div className="no-chat-selected">
          <h3>Selecciona un chat para empezar a conversar</h3>
        </div>
      </div>
    );
  }

  return (
      <div className="chat-window">
      <div className="chat-header">
      <div className="chat-header-back">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
      <FaArrowLeft />
    </button>
  </div>
        <div className="contact-avatar">
          {currentChat.avatar}
        </div>
        <div className="chat-header-info">
          <div className="chat-contact-name">{currentChat.name}</div>
          <div className="chat-contact-status">
            {currentChat.isOnline ? 'En línea' : `Visto por última vez ${new Date(currentChat.lastSeen).toLocaleString()}`}
          </div>
        </div>
        <div className="chat-header-actions">
          <FaPaperclip />
          <FaSmile />
        </div>
      </div>

      <div className="messages-container">
        {currentChat.messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input">
        <div className="input-actions">
          <FaSmile />
          <FaPaperclip />
        </div>
        <form className="message-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Escribe un mensaje"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          {messageText.trim() ? (
            <button type="submit" className="send-button">
              <FaPaperPlane />
            </button>
          ) : (
            <FaMicrophone />
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
