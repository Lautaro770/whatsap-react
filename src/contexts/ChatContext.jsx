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
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      lastMessage: '¡Hola! ¿Cómo estás?',
      timestamp: '10:30',
      unread: 2,
      online: true,
      lastSeen: '10:25'
    },
    {
      id: 2,
      name: 'María García',
      lastMessage: 'Nos vemos mañana en la oficina',
      timestamp: '9:15',
      unread: 0,
      online: true,
      lastSeen: '10:15'
    },
    {
      id: 3,
      name: 'Carlos López',
      lastMessage: '¿Viste el partido de anoche?',
      timestamp: 'Ayer',
      unread: 1,
      online: false,
      lastSeen: 'Ayer 22:30'
    },
    {
      id: 4,
      name: 'Ana Martínez',
      lastMessage: 'Te envío los documentos',
      timestamp: 'Ayer',
      unread: 0,
      online: true,
      lastSeen: '10:20'
    },
    {
      id: 5,
      name: 'Pedro Rodríguez',
      lastMessage: '👍',
      timestamp: '07/10',
      unread: 0,
      online: false,
      lastSeen: '06/10 18:45'
    }
  ]);

  const [messages, setMessages] = useState({});
  const [currentContact, setCurrentContact] = useState(null);

  // Inicializar mensajes para cada contacto
  useEffect(() => {
    const initialMessages = {
      1: [
        { id: 1, text: '¡Hola! ¿Cómo estás?', sender: 'them', timestamp: '10:30', delivered: true, seen: true },
        { id: 2, text: '¡Hola Juan! Estoy bien, ¿y tú?', sender: 'me', timestamp: '10:31', delivered: true, seen: true },
        { id: 3, text: 'Todo excelente por aquí. ¿Qué planes tienes para el fin de semana?', sender: 'them', timestamp: '10:32', delivered: true, seen: true },
        { id: 4, text: 'Voy a la playa con unos amigos. ¿Te gustaría unirte?', sender: 'me', timestamp: '10:33', delivered: true, seen: false }
      ],
      2: [
        { id: 1, text: 'Nos vemos mañana en la oficina para la reunión', sender: 'them', timestamp: '9:15', delivered: true, seen: true },
        { id: 2, text: 'Perfecto, ahí estaré a las 10:00', sender: 'me', timestamp: '9:16', delivered: true, seen: true },
        { id: 3, text: 'No olvides traer los reportes', sender: 'them', timestamp: '9:17', delivered: true, seen: true }
      ],
      3: [
        { id: 1, text: '¿Viste el partido de anoche?', sender: 'them', timestamp: 'Ayer', delivered: true, seen: true },
        { id: 2, text: 'Sí, fue increíble el gol al último minuto', sender: 'me', timestamp: 'Ayer', delivered: true, seen: true },
        { id: 3, text: 'El equipo está en gran forma esta temporada', sender: 'them', timestamp: 'Ayer', delivered: true, seen: true }
      ]
    };
    setMessages(initialMessages);
  }, []);

  const sendMessage = (contactId, text) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      delivered: true,
      seen: false
    };

    setMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMessage]
    }));

    // Simular respuesta automática después de 2 segundos
    setTimeout(() => {
      const responses = [
        '¡Interesante!',
        '¿En serio?',
        'Jajaja 😄',
        'Claro que sí',
        'Te entiendo',
        '¿Y luego qué pasó?'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'them',
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        delivered: true,
        seen: false
      };

      setMessages(prev => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), responseMessage]
      }));

      // Actualizar último mensaje en el contacto
      setContacts(prev => prev.map(contact => 
        contact.id === contactId 
          ? { ...contact, lastMessage: randomResponse, timestamp: responseMessage.timestamp }
          : contact
      ));
    }, 2000);

    // Actualizar último mensaje en el contacto
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { ...contact, lastMessage: text, timestamp: newMessage.timestamp }
        : contact
    ));
  };

  const value = {
    contacts,
    messages,
    currentContact,
    setCurrentContact,
    sendMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
