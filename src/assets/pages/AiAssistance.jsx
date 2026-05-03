import React, { useState, useRef, useEffect } from 'react';
import { Send, User, MessageSquare, ArrowLeft, X, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Typewriter = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 10); // Faster typing speed
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, onComplete]);

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownStyles}>
            {displayedText}
        </ReactMarkdown>
    );
};

// Moved markdownStyles outside or ensured it's defined before Typewriter
const markdownStyles = {
    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />, // Reduced margin
    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2" {...props} />,
    li: ({node, ...props}) => <li className="mb-1" {...props} />,
    h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-md font-bold mb-2" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-2" {...props} />,
    strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
    a: ({node, ...props}) => <a className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer" {...props} />,
};

const AiAssistance = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am your VoteSetu AI assistant. How can I help you with the voting process in India today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'English');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleLangChange = () => {
            setLanguage(localStorage.getItem('preferredLanguage') || 'English');
        };
        window.addEventListener('languageChange', handleLangChange);
        return () => window.removeEventListener('languageChange', handleLangChange);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    question: input,
                    language: language 
                })
            });
            const data = await res.json();

            const aiMessage = {
                id: Date.now() + 1,
                text: data.answer || "I'm sorry, I couldn't process that. Please try again.",
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Connection error. Please ensure the backend is running.",
                sender: 'ai'
            }]);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-white text-black font-sans flex flex-col">
            <Navbar />

            <main className="flex-1 mt-20 max-w-4xl w-full mx-auto p-6 flex flex-col">
                {/* Page Header */}
                <div className="mb-8 border-b border-black pb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter">Ai Assistance</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-[0.3em] mt-2">Personalized voting guide</p>
                    </div>
                    <Link to="/dashboard" className="text-xs font-bold uppercase flex items-center gap-2 hover:opacity-50 transition-opacity">
                        <ArrowLeft size={14} /> Back to Dashboard
                    </Link>
                </div>

                {/* Chat Container */}
                <div className="flex-1 border-2 border-black bg-gray-50 flex flex-col overflow-hidden mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-4 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-black ${msg.sender === 'user' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                        {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className={`p-4 text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-black text-white shadow-lg' : 'bg-white border border-black'}`}>
                                        {msg.sender === 'user' ? (
                                            <p className="text-white">{msg.text}</p>
                                        ) : (
                                            <div className="text-black max-w-none">
                                                {msg.id === messages[messages.length - 1].id && msg.sender === 'ai' ? (
                                                    <Typewriter text={msg.text} onComplete={scrollToBottom} />
                                                ) : (
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownStyles}>
                                                        {msg.text}
                                                    </ReactMarkdown>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex gap-4 items-center">
                                    <div className="w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center">
                                        <Bot size={16} className="animate-pulse" />
                                    </div>
                                    <div className="text-[10px] uppercase font-black tracking-widest text-gray-400 animate-pulse">
                                        VoteSetu AI is thinking...
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} className="p-4 border-t-2 border-black bg-white flex gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything about voting in India..."
                            className="flex-1 bg-transparent border-b border-black py-2 outline-none text-xs font-bold focus:border-gray-400 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-black text-white p-4 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {["How to register?", "Documents required", "Booth location"].map((query) => (
                        <button
                            key={query}
                            onClick={() => setInput(query)}
                            className="border border-black p-3 text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-all text-center"
                        >
                            {query}
                        </button>
                    ))}
                </div>
            </main>

            <footer className="py-8 border-t border-black text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.5em]">VOTE SETU &copy; 2026 | AI ASSISTANCE ENGINE</p>
            </footer>
        </div>
    );
};

export default AiAssistance;
