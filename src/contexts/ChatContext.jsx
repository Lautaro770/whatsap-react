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

  // Cargar chats - SIMPLIFICADO para evitar errores
  useEffect(() => {
    console.log('🔄 Cargando chats...');
    try {
      // Usar datos iniciales directamente, sin localStorage en producción
      setChats(initialChats);
      setIsLoaded(true);
      console.log('✅ Chats cargados correctamente');
    } catch (error) {
      console.error('❌ Error cargando chats:', error);
      setChats([]);
      setIsLoaded(true);
    }
  }, []);

  // Función sendMessage - CON MÁS VERIFICACIONES
  const sendMessage = (chatId, messageText) => {
    console.log('📤 Enviando mensaje a chat:', chatId, messageText);
    
    if (!messageText || !messageText.trim()) {
      console.log('⚠️ Mensaje vacío, no se envía');
      return;
    }

    try {
      const newMessage = {
        id: Date.now().toString(),
        text: messageText.trim(),
        timestamp: new Date().toISOString(),
        isSent: true,
        isRead: false
      };

      setChats(prevChats => {
        if (!prevChats || !Array.isArray(prevChats)) {
          console.log('📝 No hay chats previos, usando iniciales');
          return initialChats.map(chat => 
            chat.id === chatId 
              ? {
                  ...chat,
                  messages: [...chat.messages, newMessage],
                  lastMessage: messageText,
                  lastMessageTime: new Date().toISOString()
                }
              : chat
          );
        }

        return prevChats.map(chat => {
          if (chat.id === chatId) {
            const updatedMessages = [...(chat.messages || []), newMessage];
            return {
              ...chat,
              messages: updatedMessages,
              lastMessage: messageText,
              lastMessageTime: new Date().toISOString()
            };
          }
          return chat;
        });
      });

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
          timestamp: new Date().toISOString(),
          isSent: false,
          isRead: true
        };

        setChats(prevChats => {
          if (!prevChats || !Array.isArray(prevChats)) {
            return initialChats.map(chat => 
              chat.id === chatId 
                ? {
                    ...chat,
                    messages: [...chat.messages, autoReply],
                    lastMessage: randomResponse,
                    lastMessageTime: new Date().toISOString()
                  }
                : chat
            );
          }

          return prevChats.map(chat => {
            if (chat.id === chatId) {
              const updatedMessages = [...(chat.messages || []), autoReply];
              return {
                ...chat,
                messages: updatedMessages,
                lastMessage: randomResponse,
                lastMessageTime: new Date().toISOString()
              };
            }
            return chat;
          });
        });
      }, 2000);

    } catch (error) {
      console.error('❌ Error enviando mensaje:', error);
    }
  };

  // Función getFilteredChats - CORREGIDA CON VERIFICACIONES
  const getFilteredChats = () => {
    if (!searchTerm || !chats || !Array.isArray(chats) || chats.length === 0) {
      return chats || [];
    }
    
    try {
      const filtered = chats.filter(chat => {
        if (!chat || !chat.name) return false;
        
        const nameMatch = chat.name.toLowerCase().includes(searchTerm.toLowerCase());
        const messageMatch = chat.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase());
        
        return nameMatch || messageMatch;
      });
      
      return filtered;
    } catch (error) {
      console.error('❌ Error filtrando chats:', error);
      return chats;
    }
  };

  // Valor del contexto - CON FALLBACKS PARA EVITAR ERRORES
  const value = {
    chats: getFilteredChats(),
    currentChat,
    setCurrentChat: setCurrentChat || (() => console.log('setCurrentChat no disponible')),
    searchTerm: searchTerm || '',
    setSearchTerm: setSearchTerm || (() => console.log('setSearchTerm no disponible')),
    sendMessage: sendMessage || (() => console.log('sendMessage no disponible')),
    isLoaded
  };

  console.log('🎯 ChatContext proporcionado con:', { 
    chatsCount: getFilteredChats().length,
    currentChat: currentChat?.name,
    searchTerm,
    isLoaded 
  });

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};