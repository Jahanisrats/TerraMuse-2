import React, { useState, useRef, useEffect } from 'react';
import { createChatSession } from '../utils/genai';

interface Message {
    role: 'user' | 'model';
    text: string;
}

interface MuseChatProps {
    isOpen: boolean;
    onClose: () => void;
}

const MuseChat: React.FC<MuseChatProps> = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Hello, I'm Muse. I can help you find the perfect earth-toned look or answer questions about our sustainable collection. What are you looking for today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chatSessionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize chat session once
    useEffect(() => {
        if (!chatSessionRef.current) {
            chatSessionRef.current = createChatSession();
        }
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                 messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [messages, isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chatSessionRef.current) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            const result = await chatSessionRef.current.sendMessage({ message: userMsg });
            setMessages(prev => [...prev, { role: 'model', text: result.text }]);
        } catch (error) {
            console.error("Error talking to Muse:", error);
            setMessages(prev => [...prev, { role: 'model', text: "I'm having a little trouble connecting to the earth right now. Please try again in a moment." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] max-w-[calc(100vw-48px)] h-[500px] max-h-[70vh] bg-background-light/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-[60] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8 pointer-events-none'}`}
        >
            {/* Header */}
            <div className="p-4 border-b border-text-main/10 bg-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-accent-orange p-0.5">
                        <div className="h-full w-full bg-background-light rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-xl">spa</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-serif text-lg text-text-main leading-none">Muse</h3>
                        <p className="text-xs text-text-sub uppercase tracking-wider">AI Stylist</p>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="h-8 w-8 rounded-full hover:bg-black/5 flex items-center justify-center text-text-sub transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper-texture">
                {messages.map((msg, idx) => (
                    <div 
                        key={idx} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                            className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                                msg.role === 'user' 
                                ? 'bg-text-main text-white rounded-tr-sm' 
                                : 'bg-white shadow-sm border border-text-main/5 text-text-main rounded-tl-sm font-serif'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-text-main/5 flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-text-sub/40 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-text-sub/40 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1.5 h-1.5 bg-text-sub/40 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white/50 border-t border-text-main/10 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask for style advice..."
                    className="flex-1 bg-white border border-text-main/10 rounded-full px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                />
                <button 
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50 hover:bg-[#d65a2e] transition-colors shadow-md"
                >
                    <span className="material-symbols-outlined text-xl">send</span>
                </button>
            </form>
        </div>
    );
};

export default MuseChat;