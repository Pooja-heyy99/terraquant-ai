import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../api/api';

const Copilot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your TerraQuant AI Copilot — powered by The Global Operating System for the Carbon Economy. I can help you with emission calculations, sustainability strategies, carbon offset recommendations, ESG compliance, and climate risk analysis. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestions = [
    'How can I reduce my company\'s carbon footprint?',
    'Explain carbon offsetting strategies',
    'What are Scope 1, 2, and 3 emissions?',
    'Best practices for ESG reporting',
    'Calculate my carbon budget',
    'Renewable energy transition plan'
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/copilot', { message: input });
      
      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: response.data.response || 'I understand your question. Let me help you with that...',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling copilot:', error);
      
      const errorMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: 'I can help you with carbon intelligence insights. Based on your query, I recommend focusing on energy efficiency, renewable energy adoption, and supply chain optimization to reduce emissions.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="animate-fade-in space-y-6 h-[calc(100vh-8rem)]">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          AI Carbon Copilot
        </h1>
        <p className="text-gray-400 mt-2">Your intelligent assistant for carbon management and sustainability</p>
      </div>

      {/* Chat Container */}
      <div className="glass-card flex flex-col h-[calc(100%-6rem)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-green-500 to-cyan-400 text-white'
                    : 'bg-gray-800/50 border border-gray-700 text-gray-100'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="markdown-content text-sm leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                )}
                <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start animate-slide-up">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-cyan-400 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Loader className="w-5 h-5 text-green-400 animate-spin" />
                  <span className="text-gray-400 text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions (show when no messages from user yet) */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <p className="text-sm text-gray-400">Try asking:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-green-500/50 hover:bg-gray-800 transition-all text-sm text-gray-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about carbon management..."
              className="flex-1 resize-none input min-h-[60px] max-h-[120px]"
              rows="2"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="btn btn-primary px-6 self-end"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Copilot;
