import React from 'react';
import { FaEllipsisV, FaCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="user-avatar">
          TU
        </div>
        <div className="header-actions">
          <FaCircle />
          <FaEllipsisV />
        </div>
      </div>
    </div>
  );
};

export default Header;
