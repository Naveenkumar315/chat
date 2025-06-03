// src/components/ChatBox.jsx
import ChatMessage from "./ChatMessage";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Header from "../router/Header";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hi there! How can I help you today?",
      sender: "Chat AI",
      isUser: false,
    },
    {
      message: "What's the interest rate for home loans?",
      sender: "You",
      isUser: true,
    },
    {
      message: "Current fixed-rate home loans start at 6.75%.",
      sender: "Chat AI",
      isUser: false,
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { message: input, sender: "You", isUser: true }]);
    setInput("");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col h-full mx-auto bg-gray-100 w-[50%]">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.message}
              sender={msg.sender}
              isUser={msg.isUser}
            />
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white flex items-center gap-2 shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition shadow"
          >
            <SendIcon fontSize="small" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
