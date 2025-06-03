// src/components/ChatBox.jsx
import ChatMessage from './ChatMessage';
import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const ChatBox = () => {
    const [messages, setMessages] = useState([
        { message: "Hi there! How can I help you today?", sender: "Chat AI", isUser: false },
        { message: "What's the interest rate for home loans?", sender: "You", isUser: true },
        { message: "Current fixed-rate home loans start at 6.75%.", sender: "Chat AI", isUser: false, info: "testst" }
    ]);

    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { message: input, sender: "You", isUser: true }]);
        setInput('');

        //  try {
        //   const response = await axios.post('http://localhost:8000/chat', {
        //     message: input
        //   });

        //   const botReply = response?.data?.reply || "Sorry, I couldn't understand that.";
        //   setMessages(prev => [...prev, { message: botReply, sender: "Chat AI", isUser: false }]);
        // } catch (error) {
        //   console.error('API Error:', error);
        //   setMessages(prev => [...prev, {
        //     message: "Oops! Something went wrong.",
        //     sender: "Chat AI",
        //     isUser: false
        //   }]);
        // }
        setTimeout(() => {
            scrollToBottom();
        }, 0);
    };

    return (
        <div className="flex flex-col my-[8%] h-[90dvh] item-center bg-gray-100">
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
                <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <div className="p-3 border-t bg-white flex items-center gap-2 shadow-inner">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white mx-1 p-2 rounded-full hover:bg-blue-600 transition shadow"
                >
                    <SendIcon fontSize="small" />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
