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
  const [isLoaded, setIsLoaded] = useState(false);

  // Datos iniciales mock - MEJORADO
  const initialChats = [
    {
      id: '1',
      name: 'Juan Pérez',
      avatar: 'JP',
      lastSeen: '2024-01-15T10:30:00',
      isOnline: true,
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '2024-01-15T10:30:00',
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
      lastMessage: '¿Quedamos esta tarde?',
      lastMessageTime: '2024-01-15T09:15:00',
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
      lastMessage: 'Te envío el documento',
      lastMessageTime: '2024-01-14T22:45:00',
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
      lastMessage: '¿Viste la nueva película?',
      lastMessageTime: '2024-01-16T14:20:00',
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
      lastMessage: '¿Pasaste por el material de estudio?',
      lastMessageTime: '2024-01-16T11:30:00',
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
    }
  ];

  // Cargar chats - CORREGIDO para producción
  useEffect(() => {
    try {
      // En producción, siempre usar datos iniciales
      const isProduction = process.env.NODE_ENV === 'production';
      
      if (isProduction) {
        console.log('Cargando datos mock para producción');
        setChats(initialChats);
        setIsLoaded(true);
      } else {
        // En desarrollo, usar localStorage
        const savedChats = localStorage.getItem('whatsapp-chats');
        if (savedChats) {
          setChats(JSON.parse(savedChats));
        } else {
          setChats(initialChats);
          localStorage.setItem('whatsapp-chats', JSON.stringify(initialChats));
        }
        setIsLoaded(true);
      }
    } catch (error) {
      console.error('Error cargando chats:', error);
      setChats(initialChats);
      setIsLoaded(true);
    }
  }, []);

  // Guardar chats en localStorage solo en desarrollo
  useEffect(() => {
    if (chats.length > 0 && process.env.NODE_ENV !== 'production') {
      try {
        localStorage.setItem('whatsapp-chats', JSON.stringify(chats));
      } catch (error) {
        console.error('Error guardando chats:', error);
      }
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
      const responses = [
        '¡Claro! Estoy revisando tu mensaje.',
        'Perfecto, te respondo en un momento.',
        'Interesante, déjame pensarlo.',
        '¡Genial! Me alegra saber eso.',
        'Entendido, gracias por la información.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const autoReply = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
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
                lastMessage: randomResponse,
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
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const value = {
    chats: getFilteredChats(),
    currentChat,
    setCurrentChat,
    searchTerm,
    setSearchTerm,
    sendMessage,
    isLoaded
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};