import { useContext, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { contacts } = useContext(ChatContext);
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home__sidebar">
      <div className="chat-list__header">
        <h2>Chats</h2>
        <button className="header-button">⚙️</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar contactos"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="chat-list__contacts">
        {filteredContacts.map(contact => (
          <Link key={contact.id} to={`/chat/${contact.id}`} className="contact-item">
            <div className="contact-item__avatar">
              <div className="avatar">{contact.name[0]}</div>
              {contact.online && <span className="online-indicator" />}
            </div>
            <div className="contact-item__info">
              <div className="contact-item__header">
                <span className="contact-item__name">{contact.name}</span>
                <span className="contact-item__time">12:00</span>
              </div>
              <div className="contact-item__preview">
                <span className="contact-item__message">{contact.lastMessage}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
