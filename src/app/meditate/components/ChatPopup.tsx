"use client";

import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, MessageCircle, Play } from "lucide-react";
import { ChatResponse, Recommendation } from "../../chatbot/utils/chatbotLogic";
import { useMeditationStore } from "../utils/useMeditation";
import { useAmbientStore } from "@/hooks/useAmbientSounds";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
    recommendations?: Recommendation[];
}

export default function ChatPopup() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: "Hi! How are you feeling today?",
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    // State for detailed session ready modal
    const [sessionReadyData, setSessionReadyData] = useState<{
        title: string;
        description: string;
    } | null>(null);

    const { setDuration } = useMeditationStore();
    const { sounds, addSound, toggle } = useAmbientStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    if (!session) return null;

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage.content }),
            });

            if (!res.ok) throw new Error('Failed to fetch');

            const data: ChatResponse = await res.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: data.message,
                recommendations: data.recommendations,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: "I'm having a little trouble connecting right now. But remember, just taking a deep breath can help.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleAction = async (rec: Recommendation) => {
        if (rec.action) {
            // Set Timer
            if (rec.action.duration) {
                setDuration(rec.action.duration);
            }

            // Set Ambient Sound
            if (rec.action.ambientSound) {
                const soundName = rec.action.ambientSound.toLowerCase();
                const currentSounds = useAmbientStore.getState().sounds;
                const existingSound = currentSounds.find(s => s.name === soundName);

                if (existingSound) {
                    if (!existingSound.isPlaying) toggle(soundName);
                } else {
                    try {
                        // Check if loading to prevent duplicates
                        if (!useAmbientStore.getState().loading) {
                            await addSound(soundName);
                            // Sound is added in 'off' mode by default. 
                            // User requested to keep it off: "make sure that the sound which is fetched from freesound api is in off mode"
                        }
                    } catch (e) {
                        console.error("Failed to add sound", e);
                    }
                }
            }

            setIsOpen(false);

            // Show Session Ready Toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Detailed Session Ready Modal */}
            {sessionReadyData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full border border-emerald-100 dark:border-purple-900 p-6 relative animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
                        <button
                            onClick={() => setSessionReadyData(null)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-2">
                                <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Session Ready
                            </h2>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                                    {sessionReadyData.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {sessionReadyData.description}
                                </p>
                            </div>

                            <div className="pt-4 w-full">
                                <button
                                    onClick={() => setSessionReadyData(null)}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                                >
                                    Begin Meditation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">Meditation session ready!</span>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all z-50 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Popup Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="p-4 bg-indigo-600/90 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-indigo-200" />
                            <h3 className="font-semibold text-white">Mindful Companion</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === "user"
                                        ? "bg-indigo-600 text-white rounded-br-none"
                                        : "bg-white/10 text-gray-100 rounded-bl-none"
                                        }`}
                                >
                                    <p className="leading-relaxed">{msg.content}</p>

                                    {/* Recommendations */}
                                    {msg.recommendations && (
                                        <div className="mt-3 space-y-2">
                                            {msg.recommendations.map((rec, idx) => (
                                                <div key={idx} className="bg-black/20 rounded-lg p-2.5 hover:bg-black/30 transition-colors">
                                                    <h4 className="font-medium text-white text-xs mb-1">{rec.title}</h4>
                                                    <p className="text-xs text-gray-300 mb-2 line-clamp-2">{rec.description}</p>

                                                    {rec.action && (
                                                        <button
                                                            onClick={() => handleAction(rec)}
                                                            className="w-full flex items-center justify-center gap-1.5 bg-indigo-500/30 hover:bg-indigo-500/50 text-indigo-200 text-xs py-1.5 rounded-md transition-colors"
                                                        >
                                                            <Play className="w-3 h-3" />
                                                            {rec.action.label}
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 rounded-2xl rounded-bl-none p-3 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-black/40 border-t border-white/10">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
