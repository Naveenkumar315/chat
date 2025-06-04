import { useState } from "react";
import Header from "./router/Header";
import ChatBox from "./components/ChatBox";
import WelcomePage from "./components/WelcomePage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/chat" element={
            <div className="h-screen flex flex-col">
              <Header />
              <div className="flex w-full flex-1 bg-red-300">
                <ChatBox />
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </>
  );
};

export default App;
