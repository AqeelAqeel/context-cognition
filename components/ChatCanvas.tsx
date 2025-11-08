'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/ce';

interface ChatCanvasProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isTyping?: boolean;
}

export function ChatCanvas({ messages, onSendMessage, isTyping = false }: ChatCanvasProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const formatToolCall = (tool: { tool: string; args?: Record<string, unknown>; result?: Record<string, unknown> }) => {
    return (
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-blue-600">🔧</span>
          <span className="font-medium text-blue-800">{tool.tool}</span>
          {tool.result?.ok === false && (
            <span className="text-red-600 text-xs">❌ Failed</span>
          )}
        </div>
        {tool.args && (
          <div className="text-xs text-slate-600 mb-1">
            Args: {JSON.stringify(tool.args)}
          </div>
        )}
        {tool.result && (
          <div className="text-xs text-slate-700">
            Result: {typeof tool.result === 'object' ? JSON.stringify(tool.result) : tool.result}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-96 bg-white border border-slate-200 rounded-lg overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 mt-8">
            <div className="text-4xl mb-2">💭</div>
            <p className="text-sm">Start a conversation to see the 3-layer architecture in action</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                
                {/* Tool calls */}
                {message.toolCalls && message.toolCalls.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.toolCalls.map((tool, idx) => (
                      <div key={idx}>
                        {formatToolCall(tool)}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="text-xs opacity-75 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-slate-500 ml-2">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="border-t border-slate-200 p-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}