
import React, { useState, useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage } from '../types';
import { ChatBubbleIcon, PaperAirplaneIcon, XIcon } from './Icons';

const CHAT_HISTORY_KEY = 'innovate-chat-history';
const MAX_HISTORY_LENGTH = 30; // Store the last 30 messages

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false); // To track initial load from localStorage
    const chatSessionRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const chatWindowRef = useRef<HTMLDivElement | null>(null);

    // Effect to load messages from localStorage on initial render
    useEffect(() => {
        try {
            const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
            if (savedMessages) {
                const parsedMessages: ChatMessage[] = JSON.parse(savedMessages);
                if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
                    setMessages(parsedMessages);
                }
            }
        } catch (error) {
            console.error("Failed to load chat history from localStorage:", error);
            localStorage.removeItem(CHAT_HISTORY_KEY); // Clear corrupted data
        }
        setIsInitialized(true); // Signal that loading is complete
    }, []); // Runs only on mount

    // Effect to save messages to localStorage whenever they change, after initialization
    useEffect(() => {
        if (!isInitialized) {
            return; // Don't save until after the initial load
        }
        try {
            // Get the last N messages to save
            const messagesToSave = messages.slice(-MAX_HISTORY_LENGTH);
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messagesToSave));
        } catch (error) {
            console.error("Failed to save chat history to localStorage:", error);
        }
    }, [messages, isInitialized]);


    // Initialize Chat Session only once
    useEffect(() => {
        if (!chatSessionRef.current) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const chat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: 'You are a friendly and helpful customer support agent for Innovate Solutions. Your goal is to answer user questions about the company, its services (Data-Driven Insights, Scalable Infrastructure, 24/7 Expert Support), and guide them. If you cannot answer a question, politely direct them to use the contact form in the footer for more specific inquiries.',
                    },
                });
                chatSessionRef.current = chat;
            } catch (e) {
                console.error("Failed to initialize chat:", e);
                 setMessages([
                    {
                        sender: 'bot',
                        text: 'Sorry, the chat service is currently unavailable.',
                    },
                ]);
            }
        }
    }, []);

    // Add initial message when chat is opened for the first time
    useEffect(() => {
        if (isOpen && messages.length === 0 && chatSessionRef.current) {
            setMessages([
                {
                    sender: 'bot',
                    text: 'Hello! How can I help you today with Innovate Solutions?',
                },
            ]);
        }
    }, [isOpen, messages.length]);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);
    
    // Focus management for accessibility
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        } else {
            toggleButtonRef.current?.focus();
        }
    }, [isOpen]);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'Tab' && chatWindowRef.current) {
            const focusableElements = Array.from<HTMLElement>(
                chatWindowRef.current.querySelectorAll(
                    'button, [href], input, [tabindex]:not([tabindex="-1"])'
                )
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading || !chatSessionRef.current) return;

        const userMessage: ChatMessage = { sender: 'user', text: inputValue };
        setMessages((prev) => [...prev, userMessage]);
        const currentInput = inputValue;
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chatSessionRef.current.sendMessage({ message: currentInput });
            const botMessage: ChatMessage = { sender: 'bot', text: response.text };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: ChatMessage = {
                sender: 'bot',
                text: 'Sorry, something went wrong. Please try again.',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[1000]">
            {/* Chat Window */}
            <div
                ref={chatWindowRef}
                id="chat-window"
                className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                } w-80 sm:w-96 h-[28rem] sm:h-[32rem] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200`}
                role="dialog"
                aria-modal="true"
                aria-hidden={!isOpen}
                aria-labelledby="chat-heading"
                onKeyDown={handleKeyDown}
            >
                {/* Header */}
                <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center flex-shrink-0">
                    <h3 id="chat-heading" className="font-semibold text-lg">Chat with us!</h3>
                    <button onClick={() => setIsOpen(false)} className="text-white hover:text-indigo-100" aria-label="Close chat">
                        <XIcon />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50" role="log" aria-live="polite">
                    <div className="flex flex-col gap-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] rounded-xl px-4 py-2 shadow-sm ${
                                        msg.sender === 'user'
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-white text-gray-800 border border-gray-200'
                                    }`}
                                >
                                    <p className="text-sm break-words">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start" role="status" aria-live="polite">
                                <div className="bg-gray-100 rounded-xl px-4 py-3">
                                    <div className="flex items-center justify-center gap-2" aria-label="Bot is typing">
                                        <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg flex-shrink-0">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                            disabled={isLoading || !chatSessionRef.current}
                            aria-label="Chat input"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center w-10 h-10 flex-shrink-0"
                            disabled={isLoading || !inputValue.trim() || !chatSessionRef.current}
                            aria-label="Send message"
                        >
                           <PaperAirplaneIcon />
                        </button>
                    </form>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                ref={toggleButtonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
                } bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 active:scale-95 absolute bottom-0 right-0`}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
                aria-controls="chat-window"
                aria-expanded={isOpen}
            >
                <ChatBubbleIcon />
            </button>
        </div>
    );
};

export default ChatWidget;
