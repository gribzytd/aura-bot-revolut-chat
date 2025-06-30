
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import BotSelection from '../components/BotSelection';
import Settings from '../components/Settings';
import History from '../components/History';
import Account from '../components/Account';
import Auth from '../components/Auth';
import { Bot, ChatMessage, User } from '../types';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[][]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    setMessages([]);
    setSelectedBot(null);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedBot || !currentUser) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      botId: selectedBot.id
    };

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: `${selectedBot.name}: ${selectedBot.responses[Math.floor(Math.random() * selectedBot.responses.length)]}`,
      sender: 'bot',
      timestamp: new Date(),
      botId: selectedBot.id
    };

    const newMessages = [...messages, userMessage, botMessage];
    setMessages(newMessages);
  };

  const saveToHistory = () => {
    if (messages.length > 0) {
      setChatHistory(prev => [...prev, messages]);
      setMessages([]);
    }
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
        user={currentUser}
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Routes>
          <Route path="/" element={
            selectedBot ? (
              <ChatInterface
                bot={selectedBot}
                messages={messages}
                onSendMessage={handleSendMessage}
                onNewChat={saveToHistory}
              />
            ) : (
              <BotSelection onSelectBot={setSelectedBot} />
            )
          } />
          <Route path="/bots" element={<BotSelection onSelectBot={setSelectedBot} />} />
          <Route path="/history" element={<History chatHistory={chatHistory} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Account user={currentUser} onUpdateUser={setCurrentUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default Index;
