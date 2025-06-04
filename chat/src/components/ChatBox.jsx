// src/components/ChatBox.jsx
import ChatMessage from './ChatMessage';
import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
// import axios from 'axios';

const ChatBox = () => {
    const [messages, setMessages] = useState([
        { message: "Hi, I am Naveen your Office Pal. How can i help today?", sender: "Chat AI", isUser: false, sources: '', timing: "" },
        // { message: "What's the interest rate for home loans?", sender: "You", isUser: true, sources: '', timing: ""  },
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

        try {
            const response = await axios.post('http://localhost:3008/query', {
                question: input
            });

            //             let response = {"data":  {
            //     "answer": "The HR onboarding policy outlines the process for initiating the onboarding of a new employee, including generating a notification email, notifying IT and relevant departments, raising the New Asset Form (NAF) for IT requirements, and initiating the onboarding process in Zoho. Additionally, it includes conducting an orientation program to introduce the new employee to the organization's culture, policies, and work ethics.",
            //     "sources": [
            //         {
            //             "file": "C:\\Users\\LDNA40004\\Documents\\chatbot\\ChatBOT\\SOP\\SOP - Onboarding & Offboarding v2.pdf",
            //             "page": "2"
            //         },
            //         {
            //             "file": "C:\\Users\\LDNA40004\\Documents\\chatbot\\ChatBOT\\SOP\\SOP - Onboarding & Offboarding v2.pdf",
            //             "page": "1"
            //         }
            //     ],
            //     "timing": {
            //         "embedding_retrieval": 0.17,
            //         "llm_response": 2.38,
            //         "total": 2.55
            //     }
            // }
            // }

            const botReply = response?.data?.answer || "Sorry, I couldn't understand that.";
            const sources = response?.data?.sources || "Sorry, I couldn't understand that.";
            const timing = response?.data?.timing || "Sorry, I couldn't understand that.";
            setMessages(prev => [...prev, { message: botReply, sender: "Chat AI", isUser: false, sources: sources, timing: timing }]);

            setTimeout(() => {
                scrollToBottom();
            }, 0);

        } catch (error) {
            console.error('API Error:', error);
            setMessages(prev => [...prev, {
                message: "Oops! Something went wrong.",
                sender: "Chat AI",
                isUser: false
            }]);
        }

    };
    return (
        <div className="flex flex-col w-[50%] mx-auto mt-14 h-[95dvh] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <div className="h-[60px]">
                <div className="relative h-[100px] w-full overflow-hidden z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#0099ff" />
                                <stop offset="100%" stop-color="#00c6ff" />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#waveGradient)"
                            fill-opacity="1"
                            d="M0,224L120,213.3C240,203,480,181,720,192C960,203,1200,245,1320,266.7L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z">
                        </path>
                    </svg>

                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
                        <div className="flex items-center gap-2">
                            <h1 className="text-white font-bold mt-0 text-xl">Welcome to CA Genie</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-4 h-[100%] overflow-y-auto">
                {messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        message={msg.message}
                        sender={msg.sender}
                        isUser={msg.isUser}
                        sources={msg.sources}
                        timing={msg.timing}
                        index={index}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-3 border-t h-[100px] bg-white  shadow-inner">
                <div className='flex items-center gap-2'>
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
                <div className="text-xs text-gray-500 italic text-right mt-2 pr-14">
                    Powered by <span className="font-semibold text-blue-600">LoanDNA</span>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
