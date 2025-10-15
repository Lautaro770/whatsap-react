// src/components/SearchBar.jsx
import React from 'react';
import { useChat } from '../contexts/ChatContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useChat();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar" role="search">
      <input
        type="text"
        placeholder="Buscar conversaciones..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        aria-label="Buscar conversaciones"
      />
      <span className="search-icon" aria-hidden="true">🔍</span>
    </div>
  );
};

export default SearchBar;