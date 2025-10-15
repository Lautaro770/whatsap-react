import React from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';

const Chat = () => {
  const { contactId } = useParams();
  
  // Convertir a número y verificar
  const parsedContactId = parseInt(contactId);
  
  console.log('Chat ID:', contactId, 'Parsed:', parsedContactId);

  return (
    <div className="chat-page">
      <ChatWindow contactId={parsedContactId} />
    </div>
  );
};

export default Chat;
