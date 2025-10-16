import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ChatList from '../components/ChatList';

const Home = () => {
  return (
    <div className="sidebar">
      <Header />
      <SearchBar />
      <ChatList />
    </div>
  );
};

export default Home;