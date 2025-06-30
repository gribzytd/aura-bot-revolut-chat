
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  MessageSquare, 
  History, 
  Settings, 
  User, 
  Brain,
  Code,
  Palette,
  TrendingUp,
  PenTool,
  Search,
  ShoppingCart,
  Mail,
  Target,
  Users,
  Briefcase,
  BarChart,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { Bot as BotType, ChatMessage, User as UserType } from '../types';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface MainDashboardProps {
  onSelectBot: (bot: BotType) => void;
  chatHistory: ChatMessage[][];
  user: UserType | null;
  onUpdateUser: (user: UserType) => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const MainDashboard = ({ 
  onSelectBot, 
  chatHistory, 
  user, 
  onUpdateUser, 
  currentTheme, 
  onThemeChange 
}: MainDashboardProps) => {
  const [activeSection, setActiveSection] = useState('bots');
  const [searchTerm, setSearchTerm] = useState('');

  const bots: BotType[] = [
    {
      id: 'social-media-manager',
      name: 'Social Media Manager',
      description: 'Automatically creates and schedules social media posts, responds to comments and tracks trends',
      avatar: TrendingUp,
      gradient: 'from-blue-500 to-purple-600',
      capabilities: ['Content Creation', 'Scheduling', 'Trend Analysis', 'Community Management'],
      responses: ['Let me help you create engaging social media content!', 'I can schedule your posts across all platforms.']
    },
    {
      id: 'customer-support',
      name: 'Customer Support Specialist',
      description: 'Provides 24/7 customer support with personalized responses',
      avatar: Users,
      gradient: 'from-green-500 to-teal-600',
      capabilities: ['24/7 Support', 'Personalized Responses', 'Issue Resolution', 'Customer Satisfaction'],
      responses: ['How can I help you today?', 'I\'m here to resolve your issue quickly.']
    },
    {
      id: 'data-analyst',
      name: 'Data Analyst',
      description: 'Processes large datasets and generates clear analyses and recommendations',
      avatar: BarChart,
      gradient: 'from-indigo-500 to-blue-600',
      capabilities: ['Data Processing', 'Statistical Analysis', 'Visualization', 'Insights Generation'],
      responses: ['Let me analyze your data and provide insights.', 'I can create comprehensive reports for you.']
    },
    {
      id: 'business-developer',
      name: 'Business Developer',
      description: 'Helps find new business opportunities and generate leads',
      avatar: Briefcase,
      gradient: 'from-orange-500 to-red-600',
      capabilities: ['Lead Generation', 'Market Research', 'Strategy Development', 'Opportunity Analysis'],
      responses: ['I can help you identify new business opportunities.', 'Let\'s develop a growth strategy together.']
    },
    {
      id: 'copywriter',
      name: 'Copywriter',
      description: 'Creates compelling copy for websites, ads, blogs and other channels',
      avatar: PenTool,
      gradient: 'from-pink-500 to-purple-600',
      capabilities: ['Website Copy', 'Ad Copy', 'Blog Writing', 'Brand Voice'],
      responses: ['I\'ll create compelling copy that converts.', 'Let me help you tell your brand story.']
    },
    {
      id: 'seo-specialist',
      name: 'SEO Specialist',
      description: 'Optimizes online content and analyzes website performance',
      avatar: Search,
      gradient: 'from-yellow-500 to-orange-600',
      capabilities: ['Keyword Research', 'Content Optimization', 'Technical SEO', 'Performance Analysis'],
      responses: ['I can optimize your content for search engines.', 'Let\'s improve your website rankings.']
    }
  ];

  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sessions = chatHistory.map((messages, index) => ({
    id: `session-${index}`,
    title: messages[0]?.content.slice(0, 50) + '...' || 'New Chat',
    messages,
    botId: messages[0]?.botId || 'social-media-manager',
    createdAt: messages[0]?.timestamp || new Date(),
    messageCount: messages.length
  }));

  const sections = [
    { id: 'bots', label: 'Bot Hub', icon: Bot },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'account', label: 'Account', icon: User }
  ];

  const isDark = currentTheme === 'dark';

  return (
    <div className={`h-full ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header Navigation */}
      <div className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow-sm'
                      : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Theme Switcher */}
          <div className="flex items-center space-x-2">
            <Select value={currentTheme} onValueChange={onThemeChange}>
              <SelectTrigger className={`w-32 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4" />
                    <span>Light</span>
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center space-x-2">
                    <Moon className="w-4 h-4" />
                    <span>Dark</span>
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4" />
                    <span>System</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex h-full">
        <div className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            {activeSection === 'bots' && (
              <motion.div
                key="bots"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Choose Your AI Assistant
                  </h1>
                  <Input
                    placeholder="Search assistants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-64 ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white'}`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBots.map((bot, index) => {
                    const IconComponent = bot.avatar;
                    return (
                      <motion.div
                        key={bot.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
                        onClick={() => onSelectBot(bot)}
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${bot.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        
                        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {bot.name}
                        </h3>
                        
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}>
                          {bot.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {bot.capabilities.map((capability) => (
                            <span
                              key={capability}
                              className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                            >
                              {capability}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeSection === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Chat History
                </h1>
                
                {sessions.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                    <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      No conversations yet
                    </h3>
                    <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      Start chatting with an AI bot to see your history here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                      >
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {session.title}
                        </h3>
                        <div className={`flex items-center space-x-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                          <span>{session.messageCount} messages</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeSection === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Settings
                </h1>
                
                <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border`}>
                  <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Appearance
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Theme</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Choose your preferred theme</p>
                      </div>
                      <Select value={currentTheme} onValueChange={onThemeChange}>
                        <SelectTrigger className={`w-32 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Account
                </h1>
                
                {user && (
                  <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border`}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {user.name}
                        </h2>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Name
                        </label>
                        <Input
                          value={user.name}
                          onChange={(e) => onUpdateUser({ ...user, name: e.target.value })}
                          className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Email
                        </label>
                        <Input
                          value={user.email}
                          onChange={(e) => onUpdateUser({ ...user, email: e.target.value })}
                          className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
