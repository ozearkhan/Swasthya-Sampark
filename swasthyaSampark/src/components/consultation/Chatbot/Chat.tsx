import { useState, useRef, useEffect, ChangeEvent, } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { marked } from "marked";
import axios from "axios";
import { BACKEND_URL } from "../services/api.ts";
import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../Navbar/NavBar.tsx";
import Copyright from "../Copyright/Copyright.js";

// Define message types
interface Message {
    type: 'user' | 'bot';
    content: string;
}

const waitingMessages: string[] = [
    "Hang tight! I'm fetching the perfect response for you.",
    "Just a moment while I gather some insights for you.",
    // Add other waiting messages here
];

const ChatBot: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    const handlePrompt = async () => {
        if (!value.trim()) return;

        try {
            setLoading(true);
            // Add user message to the state
            setMessages(prev => [...prev, { type: 'user', content: value }]);
            setValue("");

            const predefinedPrompt = `
Please provide information about the following health concern in this format:

**Definition:**
**Causes:**
**Symptoms:**
**Treatment:**
**When to Seek Medical Attention:**
**Prevention:**

Also, note that the user will be seeing a doctor later, so there's no need to include disclaimers about AI not providing medical advice. Here's the user's question:

${value}
        `;

            // Fetch response from the API
            const response = await axios.post<{ response: string }>(`${BACKEND_URL}/api/chat/bot1`, {
                prompt: predefinedPrompt,
            });

            // Await and process the response to ensure it's a string
            const botResponse = response.data.response;

            // Convert to HTML and force type to be a string
            const botResponseHtml = marked(botResponse) as unknown as string;

            // Update messages with resolved content
            setMessages(prev => [...prev, { type: 'bot', content: botResponseHtml }]);
        } catch (err) {
            console.error(err);
            // Handle error message
            setMessages(prev => [...prev, { type: 'bot', content: "Network Error 😢" }]);
        } finally {
            setLoading(false);
        }
    };





    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleClick = () => {
        handlePrompt();
    };

    return (
        <div className="w-full max-w-4xl h-[70vh] flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="bg-green-600 text-white p-4 text-center">
                <h2 className="text-2xl font-bold">Chat with Health-GPT</h2>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <h1 className="text-center text-gray-500 text-xl font-semibold">How can I help you today?</h1>
                )}
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-lg py-2 px-4 ${
                            message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}>
                            {message.type === 'user' && <span className="font-bold">You: </span>}
                            {message.type === 'bot' ? (
                                <div dangerouslySetInnerHTML={{ __html: message.content }} />
                            ) : (
                                message.content
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 rounded-lg py-2 px-4">
                            <ThreeDots
                                visible={true}
                                height="30"
                                width="30"
                                color="#4fa94d"
                                ariaLabel="three-dots-loading"
                            />
                        </div>
                    </div>
                )}
                <div ref={endOfMessagesRef} />
            </div>
            <div className="p-4 border-t border-gray-300 bg-gray-50">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        className="flex-grow border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={loading ? waitingMessages[Math.floor(Math.random() * waitingMessages.length)] : "Message Health-GPT"}
                        value={value}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className={`rounded-full p-3 ${
                            loading
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                        } text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out`}
                    >
                        {loading ? "🚫" : "⬆️"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const RealChatBot: React.FC = () => {
    const data = useLoaderData() as { role: string };
    const { role } = data;

    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center h-screen">
                    <ThreeDots
                        visible={true}
                        height="120"
                        width="120"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                    />
                </div>
            }
        >
            <Await resolve={role}>
                {(role) => (
                    <div className="flex flex-col min-h-screen bg-gray-100">
                        <Navbar
                            isPatient={role === "patient" || role === "unknown"}
                            isDoctor={role === "doctor" || role === "unknown"}
                            isLogout={role !== "unknown"}
                        />
                        <main className="flex-grow flex justify-center items-center p-4">
                            <ChatBot />
                        </main>
                        <Copyright />
                    </div>
                )}
            </Await>
        </Suspense>
    );
};

export default RealChatBot;
