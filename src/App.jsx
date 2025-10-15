import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ChatProvider } from "./contexts/ChatContext";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import "./styles/App.css";

function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:contactId" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
