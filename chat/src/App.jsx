import { useState } from "react";
import Header from "./router/Header";
import ChatBox from "./components/ChatBox";
import WelcomePage from "./components/WelcomePage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      {/* <div className="h-screen  flex flex-col">
        <Header />
        <div className="flex flex-1">
          <ChatBox />
        </div>
      </div> */}
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/chat" element={<ChatBox />} />
          {/* Catch-all route for 404 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
