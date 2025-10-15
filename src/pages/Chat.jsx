import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import Message from "../components/Message";

const Chat = () => {
  const { id } = useParams();
  const { messages, sendMessage, contacts } = useContext(ChatContext);
  const [text, setText] = useState("");
  const chatEndRef = useRef(null);

  const contact = contacts.find(c => c.id === parseInt(id));
  const chatMessages = messages[id] || [];

  const handleSend = e => {
    e.preventDefault();
    sendMessage(parseInt(id), text);
    setText("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span className="chat-header__title">{contact?.name}</span>
        <span className="chat-header__status">
          {contact?.online ? "En línea" : "Desconectado"}
        </span>
      </div>

      <div className="chat-messages">
        {chatMessages.map((msg, i) => (
          <Message key={i} fromMe={msg.fromMe} text={msg.text} time={msg.time} />
        ))}
        <div ref={chatEndRef} />
      </div>

      <form className="message-input-form" onSubmit={handleSend}>
        <input
          className="message-input"
          placeholder="Escribe un mensaje"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit" className="send-button">➤</button>
      </form>
    </div>
  );
};

export default Chat;
