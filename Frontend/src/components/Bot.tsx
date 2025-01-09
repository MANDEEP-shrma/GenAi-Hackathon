import React, { useState } from "react";
import { Send, Bot as BotIcon } from "lucide-react";
import axios from "axios";

export default function Bot() {
  const [prompt, setPrompt] = useState("");
  let url = import.meta.env.VITE_BACKEND_URL;
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! Thanks for sharing your Social Account info with me. I can help analyze your social media data. What would you like to know?",
    },
  ]);

  if (import.meta.env.MODE === "development") {
    url = "https://localhost:5000";
  } else {
    //use .env variables
    url = import.meta.env.VITE_BACKEND_URL;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { type: "user", content: prompt }]);

    try {
      // API call to backend
      const response = await axios.post(`${url}/api/bot`, {
        message: prompt,
      });
      // Add bot response to the chat
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            response.data.message || "Sorry, I couldn’t understand that.",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    }
    // Clear the input prompt
    setPrompt("");
  };

  return (
    <div className="h-full flex flex-col bg-white/5 backdrop-blur-sm rounded-lg border border-purple-700/20">
      <div className="p-4 border-b border-purple-700/20">
        <div className="flex items-center gap-2">
          <BotIcon className="w-6 h-6 text-purple-300" />
          <h2 className="text-lg font-semibold text-white">
            Analytics Assistant
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === "user"
                  ? "bg-purple-500 text-white rounded-br-none"
                  : "bg-purple-900/50 text-purple-100 rounded-bl-none"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-purple-700/20"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask about your social media data..."
            className="flex-1 p-2 rounded-lg bg-purple-900/30 border border-purple-700/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
