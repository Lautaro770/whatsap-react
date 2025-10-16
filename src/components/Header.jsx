
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEllipsisV, FaCircle } from 'react-icons/fa';

const Header = ({ showBackButton = false, title = "WhatsApp" }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-content">
        {showBackButton && (
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
        )}
        <div className="header-title">
          {title}
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