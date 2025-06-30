
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Bot, Trash2, Download, Filter } from 'lucide-react';
import { ChatMessage } from '../types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HistoryProps {
  chatHistory: ChatMessage[][];
}

const History = ({ chatHistory }: HistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  // Transform chat history into sessions
  const sessions = chatHistory.map((messages, index) => ({
    id: `session-${index}`,
    title: messages[0]?.content.slice(0, 50) + '...' || 'New Chat',
    messages,
    botId: messages[0]?.botId || 'brain-ai',
    createdAt: messages[0]?.timestamp || new Date(),
    messageCount: messages.length
  }));

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterBy === 'all' || session.botId === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedSessions = [...filteredSessions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'messages':
        return b.messageCount - a.messageCount;
      default:
        return 0;
    }
  });

  const deleteSession = (sessionId: string) => {
    // In a real app, this would call a function passed from parent
    console.log('Delete session:', sessionId);
  };

  const exportSession = (session: any) => {
    const content = session.messages.map((msg: ChatMessage) => 
      `${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${session.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Chat History
          </h1>
          <p className="text-xl text-gray-600">
            Browse and manage your previous conversations
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/60 border-gray-200/50"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="messages">Most Messages</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by bot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bots</SelectItem>
                <SelectItem value="brain-ai">Brain AI</SelectItem>
                <SelectItem value="code-assistant">Code Assistant</SelectItem>
                <SelectItem value="creative-bot">Creative Bot</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {sortedSessions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {searchTerm ? 'No matching conversations' : 'No conversations yet'}
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms' : 'Start chatting with an AI bot to see your history here'}
                </p>
              </motion.div>
            ) : (
              sortedSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {session.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                        <span>{session.messageCount} messages</span>
                        <span className="capitalize">{session.botId.replace('-', ' ')}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          exportSession(session);
                        }}
                        className="hover:bg-blue-50"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Preview of first few messages */}
                  <div className="space-y-3">
                    {session.messages.slice(0, 3).map((message, msgIndex) => (
                      <div
                        key={message.id}
                        className={`text-sm p-3 rounded-xl ${
                          message.sender === 'user'
                            ? 'bg-blue-50 text-blue-900 ml-6'
                            : 'bg-gray-50 text-gray-700 mr-6'
                        }`}
                      >
                        <p className="line-clamp-2">{message.content}</p>
                      </div>
                    ))}
                    {session.messages.length > 3 && (
                      <p className="text-xs text-gray-500 text-center">
                        +{session.messages.length - 3} more messages
                      </p>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default History;
