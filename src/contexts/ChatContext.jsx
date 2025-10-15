import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Ana", lastMessage: "Hola!", online: true },
    { id: 2, name: "Luis", lastMessage: "¿Cómo estás?", online: false },
  ]);

  const [messages, setMessages] = useState({
    1: [{ fromMe: false, text: "Hola!", time: "12:00" }],
    2: [{ fromMe: false, text: "¿Cómo estás?", time: "11:45" }],
  });

  const sendMessage = (contactId, text) => {
    if (!text.trim()) return;
    const newMessage = {
      fromMe: true,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMessage],
    }));
  };

  return (
    <ChatContext.Provider value={{ contacts, messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
