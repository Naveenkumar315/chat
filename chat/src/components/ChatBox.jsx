// src/components/ChatBox.jsx
import ChatMessage from './ChatMessage';
import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";


const assistantNames = [
    "Alex", "Jamie", "Taylor", "Jordan", "Riley",
    "Morgan", "Casey", "Drew", "Sam", "Cameron"
];

const randomName = assistantNames[Math.floor(Math.random() * assistantNames.length)];

const ChatBox = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { message: `Hi, I am ${randomName} your Office Pal. How can i help today?`, sender: randomName, isUser: false, sources: '', timing: "" },
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
            const response = await axios.post('http://localhost:8003/query', {
                question: input
            });

            // let response = {
            //     "data": {
            //         "answer": "The HR onboarding policy outlines the process for initiating the onboarding of a new employee, including generating a notification email, notifying IT and relevant departments, raising the New Asset Form (NAF) for IT requirements, and initiating the onboarding process in Zoho. Additionally, it includes conducting an orientation program to introduce the new employee to the organization's culture, policies, and work ethics.",
            //         "sources": [
            //             {
            //                 "file": "C:\\Users\\LDNA40004\\Documents\\chatbot\\ChatBOT\\SOP\\SOP - Onboarding & Offboarding v2.pdf",
            //                 "page": "2"
            //             },
            //             {
            //                 "file": "C:\\Users\\LDNA40004\\Documents\\chatbot\\ChatBOT\\SOP\\SOP - Onboarding & Offboarding v2.pdf",
            //                 "page": "1"
            //             },
            //         ],
            //         "timing": {
            //             "embedding_retrieval": 0.17,
            //             "llm_response": 2.38,
            //             "total": 2.55
            //         }
            //     }
            // }

            const botReply = response?.data?.answer || "Sorry, I couldn't understand that.";
            const sources = response?.data?.sources || "Sorry, I couldn't understand that.";
            const timing = response?.data?.timing || "Sorry, I couldn't understand that.";
            setMessages(prev => [...prev, { message: botReply, sender: randomName, isUser: false, sources: sources, timing: timing }]);

            setTimeout(() => {
                scrollToBottom();
            }, 0);

        } catch (error) {
            console.error('API Error:', error);
            setMessages(prev => [...prev, {
                message: "Oops! Something went wrong.",
                sender: randomName,
                isUser: false
            }]);
        }

    };
    return (
        <div className="flex flex-col w-[50%] mx-auto mt-14 h-[95dvh] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-[100px] w-full overflow-hidden z-10 bg-blue-500 rounded-br-2xl">
                {/* Close Button */}
                <button
                    onClick={() => navigate("/")}
                    type="button"
                    className="absolute top-2 right-2 text-white z-50 cursor-pointer"
                >
                    <CloseIcon />
                </button>

                {/* Main Content */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10 px-4">
                    {/* Row: Icon + Title */}
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-300 rounded-full shadow">
                            <SmartToyIcon className="text-gray-700" fontSize="small" />
                        </div>
                        <h1 className="text-white font-bold text-xl">Welcome to CA Genie</h1>
                    </div>

                    {/* Subtitle below the whole row */}
                    <p className="text-white text-xs  text-center">
                        Your go-to assistant for all company policy questions.
                    </p>
                </div>
            </div>



            <div className="flex-1 p-4 mt-3 h-[100%] overflow-y-auto">
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
