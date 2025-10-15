// src/contexts/ChatContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat debe usarse dentro de ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos iniciales simulados
  useEffect(() => {
    const initialContacts = [
      {
        id: '1',
        name: 'Ana García',
        lastMessage: '¡Hola! ¿Cómo estás?',
        timestamp: '10:30 AM',
        unread: 2,
        online: true,
        avatar: '👩'
      },
      {
        id: '2',
        name: 'Carlos López',
        lastMessage: 'Nos vemos a las 5',
        timestamp: '9:15 AM',
        unread: 0,
        online: true,
        avatar: '👨'
      },
      {
        id: '3',
        name: 'María Rodríguez',
        lastMessage: '¿Recibiste el documento?',
        timestamp: 'Ayer',
        unread: 1,
        avatar: '👩‍💼'
      },
      {
        id: '4',
        name: 'Pedro Martínez',
        lastMessage: 'Gracias por tu ayuda',
        timestamp: 'Ayer',
        unread: 0,
        online: true,
        avatar: '👨‍🎓'
      },
      {
        id: '5',
        name: 'Grupo Familia',
        lastMessage: 'Laura: ¡Feliz cumpleaños!',
        timestamp: 'Lun',
        unread: 0,
        avatar: '👨‍👩‍👧‍👦'
      }
    ];

    const initialMessages = {
      '1': [
        { id: '1', text: '¡Hola! ¿Cómo estás?', sender: '1', timestamp: new Date(Date.now() - 300000) },
        { id: '2', text: '¡Hola Ana! Estoy bien, gracias. ¿Y tú?', sender: 'me', timestamp: new Date(Date.now() - 240000) },
        { id: '3', text: 'Todo excelente por aquí. ¿Quedamos mañana?', sender: '1', timestamp: new Date(Date.now() - 180000) }
      ],
      '2': [
        { id: '1', text: 'Nos vemos a las 5', sender: '2', timestamp: new Date(Date.now() - 3600000) },
        { id: '2', text: 'Perfecto, estaré allí', sender: 'me', timestamp: new Date(Date.now() - 3500000) }
      ],
      '3': [
        { id: '1', text: '¿Recibiste el documento?', sender: '3', timestamp: new Date(Date.now() - 86400000) },
        { id: '2', text: 'Sí, ya lo revisé. Todo en orden', sender: 'me', timestamp: new Date(Date.now() - 86000000) }
      ]
    };

    setContacts(initialContacts);
    setMessages(initialMessages);
    setCurrentUser({
      id: 'me',
      name: 'Yo',
      avatar: '😊'
    });
  }, []);

  const sendMessage = (contactId, text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'me',
      timestamp: new Date()
    };

    setMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMessage]
    }));

    // Actualizar último mensaje en el contacto
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { ...contact, lastMessage: text, timestamp: 'Ahora' }
          : contact
      )
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const value = {
    contacts: filteredContacts,
    messages,
    currentUser,
    searchTerm,
    setSearchTerm,
    sendMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};