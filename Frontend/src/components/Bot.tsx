import React, { useState } from 'react';
import { Send, Bot as BotIcon } from 'lucide-react';

export default function Bot() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'HI, Thanks for giving me access to Your social media account.Iam here to provide you the metrics about your account.' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setMessages(prev => [...prev, 
      { type: 'user', content: prompt },
      { type: 'bot', content: 'Based on your social media data, here\'s what I found...' }
    ]);
    setPrompt('');
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <BotIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold">Analytics Assistant</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask about your social media data..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}