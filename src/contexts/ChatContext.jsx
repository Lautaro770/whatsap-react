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
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // TODOS los chats originales - COMPLETOS
  const initialChats = [
    {
      id: '1',
      name: 'Juan Pérez',
      avatar: 'JP',
      lastMessage: 'Hola, ¿cómo estás?',
      timestamp: '10:30 AM',
      messages: [
        { id: '1-1', text: 'Hola, ¿cómo estás?', timestamp: '10:30 AM', isSent: false },
        { id: '1-2', text: '¡Hola Juan! Estoy bien', timestamp: '10:32 AM', isSent: true }
      ]
    },
    {
      id: '2',
      name: 'María García', 
      avatar: 'MG',
      lastMessage: '¿Quedamos esta tarde?',
      timestamp: '09:15 AM',
      messages: [
        { id: '2-1', text: '¿Quedamos esta tarde?', timestamp: '09:15 AM', isSent: false }
      ]
    },
    {
      id: '3',
      name: 'Carlos López',
      avatar: 'CL', 
      lastMessage: 'Te envío el documento',
      timestamp: 'Ayer',
      messages: [
        { id: '3-1', text: 'Te envío el documento', timestamp: 'Ayer', isSent: false },
        { id: '3-2', text: 'Perfecto, lo reviso', timestamp: 'Ayer', isSent: true }
      ]
    },
    {
      id: '4',
      name: 'Ana Martínez',
      avatar: 'AM',
      lastMessage: '¿Viste la nueva película?',
      timestamp: 'Ayer',
      messages: [
        { id: '4-1', text: '¿Viste la nueva película?', timestamp: 'Ayer', isSent: false },
        { id: '4-2', text: 'Sí, ¡estuvo increíble!', timestamp: 'Ayer', isSent: true },
        { id: '4-3', text: 'Tenemos que ir juntos la próxima', timestamp: 'Ayer', isSent: false }
      ]
    },
    {
      id: '5',
      name: 'Pedro Rodríguez',
      avatar: 'PR',
      lastMessage: '¿Pasaste por el material de estudio?',
      timestamp: 'Ayer',
      messages: [
        { id: '5-1', text: '¿Pasaste por el material de estudio?', timestamp: 'Ayer', isSent: false },
        { id: '5-2', text: 'Sí, lo tengo todo listo para el examen', timestamp: 'Ayer', isSent: true }
      ]
    },
    {
      id: '6',
      name: 'Laura Fernández',
      avatar: 'LF',
      lastMessage: '¡Feliz cumpleaños! 🎉',
      timestamp: '15/10',
      messages: [
        { id: '6-1', text: '¡Feliz cumpleaños! 🎉', timestamp: '15/10', isSent: false },
        { id: '6-2', text: '¡Muchas gracias! ¿Vienes a la fiesta?', timestamp: '15/10', isSent: true },
        { id: '6-3', text: '¡Claro que sí! Llego a las 20:00', timestamp: '15/10', isSent: false }
      ]
    },
    {
      id: '7',
      name: 'Diego Silva',
      avatar: 'DS',
      lastMessage: '¿Terminaste el proyecto?',
      timestamp: '15/10',
      messages: [
        { id: '7-1', text: '¿Terminaste el proyecto?', timestamp: '15/10', isSent: false },
        { id: '7-2', text: 'Casi, me falta solo la documentación', timestamp: '15/10', isSent: true },
        { id: '7-3', text: 'Perfecto, envíamelo cuando esté listo', timestamp: '15/10', isSent: false }
      ]
    }
  ];

  // Cargar datos inmediatamente - SIN console.log
  useEffect(() => {
    setChats(initialChats);
  }, []);

  // Función sendMessage - SIN console.log
  const sendMessage = (chatId, messageText) => {
    if (!messageText || !messageText.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true
    };

    // Actualizar chats
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: messageText,
          timestamp: 'Ahora'
        };
      }
      return chat;
    });

    setChats(updatedChats);

    // Respuesta automática
    setTimeout(() => {
      const responses = [
        '¡Claro! Estoy revisando tu mensaje.',
        'Perfecto, te respondo en un momento.',
        'Interesante, déjame pensarlo.',
        '¡Genial! Me alegra saber eso.',
        'Entendido, gracias por la información.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const autoReply = {
        id: `msg-${Date.now() + 1}`,
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: false
      };

      const finalChats = updatedChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, autoReply],
            lastMessage: randomResponse,
            timestamp: 'Ahora'
          };
        }
        return chat;
      });

      setChats(finalChats);
    }, 1500);
  };

  // Filtrar chats
  const filteredChats = searchTerm 
    ? chats.filter(chat => 
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (chat.lastMessage && chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : chats;

  // Valor del contexto
  const contextValue = {
    chats: filteredChats,
    currentChat,
    setCurrentChat,
    searchTerm, 
    setSearchTerm,
    sendMessage
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};