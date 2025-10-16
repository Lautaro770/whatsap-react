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

export default SidebarNav;
