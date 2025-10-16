import React from 'react';
import { useChat } from '../contexts/ChatContext';
import ContactItem from './ContactItem';

const ChatList = () => {
  const { getFilteredChats, currentChat } = useChat();
  const filteredChats = getFilteredChats();

  return (
    <div className="chat-list">
      {filteredChats.map(chat => (
        <ContactItem
          key={chat.id}
          chat={chat}
          isActive={currentChat && currentChat.id === chat.id}
        />
      ))}
    </div>
  );
};

export default ChatList;
