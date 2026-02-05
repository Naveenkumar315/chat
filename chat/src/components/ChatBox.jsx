// src/components/ChatBox.jsx
import ChatMessage from './ChatMessage';
import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from '@mui/icons-material/Close';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import { useNavigate } from "react-router-dom";
import InfoModel from '../Models/InfoModel';


const assistantNames = [
    "Alex", "Jamie", "Taylor", "Jordan", "Riley",
    "Morgan", "Casey", "Drew", "Sam", "Cameron"
];

const randomName = assistantNames[Math.floor(Math.random() * assistantNames.length)];

const ChatBox = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { message: `Hi, I am ${randomName} your Office Pal. How can i help today?`, sender: randomName, isUser: false, sources: '', timing: "" },
    ]);
    const [infoModel, setInfoModel] = useState({ open: false })
    const [country, setCountry] = useState("India");


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
            const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8003/query";
            const response = await axios.post(`${BASE_URL}/query`, {
                question: input,
                country,
            });
            console.log(response.data);

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
    return (<>
        <div className="flex flex-col w-[50%] mx-auto mt-14 h-[95dvh] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-[100px] w-full overflow-hidden z-10 bg-blue-500 rounded-br-2xl">
                <button
                    onClick={() => navigate("/")}
                    type="button"
                    className="absolute top-2 right-2 text-white z-50 cursor-pointer"
                >
                    <CloseIcon />
                </button>

                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10 px-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-300 rounded-full shadow">
                            <SmartToyIcon className="text-gray-700" fontSize="small" />
                        </div>
                        <h1 className="text-white font-bold text-xl">Welcome to CA Genie</h1>
                    </div>

                    <p className="text-white text-xs  text-center">
                        Your go-to assistant for all company policy questions. <span className="p-1 bg-gray-300 rounded-full shadow cursor-pointer" onClick={() => {
                            setInfoModel({ open: true })
                        }}><CallMissedOutgoingIcon className="text-gray-700" fontSize="small" /></span>
                    </p>
                    <div className="absolute right-4 bottom-2 flex gap-3 bg-white px-3 py-1 rounded-full shadow text-sm">
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                value="India"
                                checked={country === "India"}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            India
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                value="US"
                                checked={country === "US"}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            US
                        </label>
                    </div>
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
            <div className="p-3 border-t h-[110px] bg-white  shadow-inner">

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
                <div className="text-xs text-gray-600 italic max-w-3xl mx-auto leading-relaxed">
                    <span className="inline-block min-w-[65px] font-bold align-top">Disclaimer:</span>
                    &nbsp;&nbsp;Please refer to the latest official documents or contact the appropriate department for confirmation. The chatbot and its creators are not responsible for any decisions made based on its responses.
                </div>


                <div className="text-xs text-gray-500 italic text-right pr-14">
                    Powered by <span className="font-semibold text-blue-600">LoanDNA</span>
                </div>
            </div>
        </div>
        {
            infoModel.open && (<InfoModel infoModel={infoModel} setInfoModel={setInfoModel} />)
        }
    </>);
};

export default ChatBox;
