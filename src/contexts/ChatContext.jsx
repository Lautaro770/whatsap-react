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

  // Datos iniciales mock
  const initialChats = [
    {
      id: '1',
      name: 'Juan Pérez',
      avatar: 'JP',
      lastSeen: '2024-01-15T10:30:00',
      isOnline: true,
      messages: [
        {
          id: '1',
          text: 'Hola, ¿cómo estás?',
          timestamp: '2024-01-15T10:30:00',
          isSent: false,
          isRead: true
        },
        {
          id: '2',
          text: '¡Hola Juan! Estoy bien, ¿y tú?',
          timestamp: '2024-01-15T10:32:00',
          isSent: true,
          isRead: true
        }
      ]
    },
    {
      id: '2',
      name: 'María García',
      avatar: 'MG',
      lastSeen: '2024-01-15T09:15:00',
      isOnline: false,
      messages: [
        {
          id: '1',
          text: '¿Quedamos esta tarde?',
          timestamp: '2024-01-15T09:15:00',
          isSent: false,
          isRead: true
        }
      ]
    },
    {
      id: '3',
      name: 'Carlos López',
      avatar: 'CL',
      lastSeen: '2024-01-14T22:45:00',
      isOnline: true,
      messages: [
        {
          id: '1',
          text: 'Te envío el documento',
          timestamp: '2024-01-14T22:45:00',
          isSent: false,
          isRead: true
        },
        {
          id: '2',
          text: 'Perfecto, lo reviso ahora',
          timestamp: '2024-01-14T22:46:00',
          isSent: true,
          isRead: true
        }
      ]
    },
    {
    id: '4',
    name: 'Ana Martínez',
    avatar: 'AM',
    lastSeen: '2024-01-16T14:20:00',
    isOnline: true,
    messages: [
      {
        id: '1',
        text: '¿Viste la nueva película?',
        timestamp: '2024-01-16T14:20:00',
        isSent: false,
        isRead: true
      },
      {
        id: '2', 
        text: 'Sí, ¡estuvo increíble!',
        timestamp: '2024-01-16T14:25:00',
        isSent: true,
        isRead: true
      },
      {
        id: '3',
        text: 'Tenemos que ir juntos la próxima',
        timestamp: '2024-01-16T14:26:00',
        isSent: false,
        isRead: true
      }
    ]
  },
  {
    id: '5',
    name: 'Pedro Rodríguez',
    avatar: 'PR',
    lastSeen: '2024-01-16T11:30:00',
    isOnline: false,
    messages: [
      {
        id: '1',
        text: '¿Pasaste por el material de estudio?',
        timestamp: '2024-01-16T11:30:00',
        isSent: false,
        isRead: true
      },
      {
        id: '2',
        text: 'Sí, lo tengo todo listo para el examen',
        timestamp: '2024-01-16T11:35:00',
        isSent: true,
        isRead: true
      }
    ]
  },
  {
    id: '6',
    name: 'Laura Fernández',
    avatar: 'LF',
    lastSeen: '2024-01-15T16:45:00',
    isOnline: true,
    messages: [
      {
        id: '1',
        text: '¡Feliz cumpleaños! 🎉',
        timestamp: '2024-01-15T16:45:00',
        isSent: false,
        isRead: true
      },
      {
        id: '2',
        text: '¡Muchas gracias! ¿Vienes a la fiesta?',
        timestamp: '2024-01-15T16:50:00',
        isSent: true,
        isRead: false
      },
      {
        id: '3',
        text: '¡Claro que sí! Llego a las 20:00',
        timestamp: '2024-01-15T17:00:00',
        isSent: false,
        isRead: true
      }
    ]
  },
  {
    id: '7',
    name: 'Diego Silva',
    avatar: 'DS',
    lastSeen: '2024-01-16T09:15:00',
    isOnline: true,
    messages: [
      {
        id: '1',
        text: '¿Terminaste el proyecto?',
        timestamp: '2024-01-16T09:15:00',
        isSent: false,
        isRead: true
      },
      {
        id: '2',
        text: 'Casi, me falta solo la documentación',
        timestamp: '2024-01-16T09:20:00',
        isSent: true,
        isRead: true
      },
      {
        id: '3',
        text: 'Perfecto, envíamelo cuando esté listo',
        timestamp: '2024-01-16T09:22:00',
        isSent: false,
        isRead: true
      }
    ]
  }
  ];

  // Cargar chats del localStorage o usar datos iniciales
  useEffect(() => {
    const savedChats = localStorage.getItem('whatsapp-chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    } else {
      setChats(initialChats);
      localStorage.setItem('whatsapp-chats', JSON.stringify(initialChats));
    }
  }, []);

  // Guardar chats en localStorage cuando cambien
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('whatsapp-chats', JSON.stringify(chats));
    }
  }, [chats]);

  const sendMessage = (chatId, messageText) => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toISOString(),
      isSent: true,
      isRead: false
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: messageText,
              lastMessageTime: new Date().toISOString()
            }
          : chat
      )
    );

    // Simular respuesta automática después de 2 segundos
    setTimeout(() => {
      const autoReply = {
        id: (Date.now() + 1).toString(),
        text: '¡Claro! Estoy revisando tu mensaje.',
        timestamp: new Date(Date.now() + 2000).toISOString(),
        isSent: false,
        isRead: true
      };

      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === chatId 
            ? {
                ...chat,
                messages: [...chat.messages, autoReply],
                lastMessage: '¡Claro! Estoy revisando tu mensaje.',
                lastMessageTime: new Date(Date.now() + 2000).toISOString()
              }
            : chat
        )
      );
    }, 2000);
  };

  const getFilteredChats = () => {
    if (!searchTerm) return chats;
    
    return chats.filter(chat =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const value = {
    chats,
    currentChat,
    setCurrentChat,
    searchTerm,
    setSearchTerm,
    sendMessage,
    getFilteredChats
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
