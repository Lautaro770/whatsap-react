import React from 'react';
import { FaComments, FaCog, FaUserFriends, FaCircle } from 'react-icons/fa';

const SidebarNav = () => {
  return (
    <div className="sidebar-nav">
      <div className="nav-items">
        <button className="nav-item active" title="Chats">
          <FaComments />
        </button>
        <button className="nav-item" title="Estados">
          <FaCircle />
        </button>
        <button className="nav-item" title="Contactos">
          <FaUserFriends />
        </button>
        <button className="nav-item" title="Ajustes">
          <FaCog />
        </button>
      </div>
    </div>
  );
};
const [activeTab, setActiveTab] = useState('chats');

const navItems = [
  { id: 'chats', icon: <FaComments />, title: 'Chats' },
  { id: 'status', icon: <FaStatusPage />, title: 'Estados' },
  { id: 'contacts', icon: <FaUserFriends />, title: 'Contactos' },
  { id: 'settings', icon: <FaCog />, title: 'Ajustes' }
];

return (
  <div className="sidebar-nav">
    <div className="nav-items">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => setActiveTab(item.id)}
          title={item.title}
        >
          {item.icon}
        </button>
      ))}
    </div>
  </div>
);

export default SidebarNav;
