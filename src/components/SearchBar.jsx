import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useChat } from '../contexts/ChatContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useChat();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <FaSearch />
        <input
          type="text"
          placeholder="Buscar o empezar un chat nuevo"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
