
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RotateCcw, Copy, ThumbsUp, ThumbsDown, Paperclip } from 'lucide-react';
import { Bot, ChatMessage } from '../types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInterfaceProps {
  bot: Bot;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  onNewChat: () => void;
  currentTheme: string;
}

const ChatInterface = ({ bot, messages, onSendMessage, onNewChat, currentTheme }: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isDark = currentTheme === 'dark';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const message = inputValue.trim();
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      onSendMessage(message);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const IconComponent = bot.avatar;

  return (
    <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200/50'} border-b p-6 shadow-sm`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${bot.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{bot.name}</h1>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{bot.description}</p>
            </div>
          </div>
          
          <Button
            onClick={onNewChat}
            variant="outline"
            className={`flex items-center space-x-2 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Conversation</span>
          </Button>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className={`w-24 h-24 bg-gradient-to-r ${bot.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                <IconComponent className="w-12 h-12 text-white" />
              </div>
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Welcome to {bot.name}
              </h2>
              <p className={`text-xl mb-8 max-w-md mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {bot.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {bot.capabilities.map((capability) => (
                  <motion.div
                    key={capability}
                    whileHover={{ scale: 1.02 }}
                    className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-white/50'} rounded-xl p-4 shadow-lg border`}
                  >
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                <div
                  className={`rounded-2xl p-4 shadow-lg ${
                    message.sender === 'user'
                      ? `bg-gradient-to-r ${bot.gradient} text-white`
                      : isDark 
                        ? 'bg-gray-800 text-gray-100 border border-gray-700'
                        : 'bg-white/80 backdrop-blur-sm text-gray-900 border border-white/50'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  
                  {message.sender === 'bot' && (
                    <div className={`flex items-center justify-between mt-4 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200/50'}`}>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyMessage(message.content)}
                          className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <Copy className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        </button>
                        <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                          <ThumbsUp className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        </button>
                        <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                          <ThumbsDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        </button>
                      </div>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                message.sender === 'user' 
                  ? isDark ? 'bg-gray-700 order-2 ml-3' : 'bg-gray-300 order-2 ml-3'
                  : `bg-gradient-to-r ${bot.gradient} order-1 mr-3`
              }`}>
                {message.sender === 'user' ? (
                  <span className={`font-medium text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>U</span>
                ) : (
                  <IconComponent className="w-5 h-5 text-white" />
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className={`w-10 h-10 bg-gradient-to-r ${bot.gradient} rounded-full flex items-center justify-center shadow-lg mr-3`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-white/50'} rounded-2xl p-4 shadow-lg border`}>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} />
                  <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '0.1s' }} />
                  <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200/50'} border-t p-6`}
      >
        <div className="flex items-end space-x-4 max-w-4xl mx-auto">
          <button className={`p-3 rounded-xl transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <Paperclip className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
          
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Type a message to ${bot.name}...`}
              className={`min-h-[50px] max-h-32 resize-none ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white/60 backdrop-blur-sm border-gray-200/50'} rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300`}
            />
          </div>
          
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className={`p-3 bg-gradient-to-r ${bot.gradient} hover:shadow-lg transition-all duration-300 disabled:opacity-50`}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        <p className={`text-center text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          {bot.name} may make mistakes. Please verify important information.
        </p>
      </motion.div>
    </div>
  );
};

export default ChatInterface;
