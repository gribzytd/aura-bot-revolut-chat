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
  Monitor,
  Calculator,
  Music,
  Camera,
  Gamepad2,
  BookOpen,
  FileText,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Headphones,
  Video,
  Mic,
  Calendar,
  DollarSign,
  Heart,
  Dumbbell,
  Car,
  Plane,
  Home,
  Utensils,
  GraduationCap,
  Award,
  Clock,
  MapPin,
  Lightbulb,
  Cpu,
  Database,
  Cloud,
  Lock,
  Wifi,
  Printer,
  Building
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
    // Marketing & Business
    {
      id: 'social-media-manager',
      name: 'Social Media Manager',
      description: 'Automatically creates and schedules social media posts, responds to comments and tracks trends',
      avatar: TrendingUp,
      color: 'blue',
      gradient: 'from-blue-500 to-purple-600',
      category: 'Marketing',
      capabilities: ['Content Creation', 'Scheduling', 'Trend Analysis', 'Community Management'],
      responses: ['Let me help you create engaging social media content!', 'I can schedule your posts across all platforms.']
    },
    {
      id: 'copywriter',
      name: 'Copywriter',
      description: 'Creates compelling copy for websites, ads, blogs and other channels',
      avatar: PenTool,
      color: 'pink',
      gradient: 'from-pink-500 to-purple-600',
      category: 'Marketing',
      capabilities: ['Website Copy', 'Ad Copy', 'Blog Writing', 'Brand Voice'],
      responses: ['I\'ll create compelling copy that converts.', 'Let me help you tell your brand story.']
    },
    {
      id: 'seo-specialist',
      name: 'SEO Specialist',
      description: 'Optimizes online content and analyzes website performance',
      avatar: Search,
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600',
      category: 'Marketing',
      capabilities: ['Keyword Research', 'Content Optimization', 'Technical SEO', 'Performance Analysis'],
      responses: ['I can optimize your content for search engines.', 'Let\'s improve your website rankings.']
    },
    {
      id: 'email-marketer',
      name: 'Email Marketing Expert',
      description: 'Designs and automates email campaigns to boost conversions',
      avatar: Mail,
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-600',
      category: 'Marketing',
      capabilities: ['Email Campaigns', 'Automation', 'Personalization', 'A/B Testing'],
      responses: ['I\'ll create email campaigns with high open rates.', 'Let me set up automated sequences for better engagement.']
    },
    {
      id: 'sales-expert',
      name: 'Sales Expert',
      description: 'Automates sales processes and suggests strategies to increase sales',
      avatar: Target,
      color: 'red',
      gradient: 'from-red-500 to-rose-600',
      category: 'Sales',
      capabilities: ['Sales Processes', 'Lead Management', 'Strategies', 'CRM'],
      responses: ['I\'ll optimize your sales processes.', 'Let\'s create a strategy to increase sales.']
    },
    {
      id: 'business-developer',
      name: 'Business Developer',
      description: 'Helps find new business opportunities and generate leads',
      avatar: Briefcase,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      category: 'Business',
      capabilities: ['Lead Generation', 'Market Research', 'Strategy Development', 'Opportunity Analysis'],
      responses: ['I can help you identify new business opportunities.', 'Let\'s develop a growth strategy together.']
    },
    {
      id: 'ecommerce-manager',
      name: 'E-commerce Manager',
      description: 'Manages online stores from product setup to sales optimization',
      avatar: ShoppingCart,
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-600',
      category: 'E-commerce',
      capabilities: ['Product Management', 'Sales Optimization', 'Performance Analysis', 'UX/UI'],
      responses: ['I\'ll optimize your online store for higher sales.', 'Let me analyze customer behavior.']
    },
    {
      id: 'financial-advisor',
      name: 'Financial Advisor',
      description: 'Provides financial planning advice and investment strategies',
      avatar: DollarSign,
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-600',
      category: 'Finance',
      capabilities: ['Financial Planning', 'Investment Advice', 'Budget Analysis', 'Risk Assessment'],
      responses: ['Let me help you plan your finances.', 'I can suggest investment strategies based on your goals.']
    },

    // Technical & Development
    {
      id: 'code-assistant',
      name: 'Code Assistant',
      description: 'Expert programming help for development, debugging, and code review',
      avatar: Code,
      color: 'green',
      gradient: 'from-green-500 to-teal-600',
      category: 'Development',
      capabilities: ['Code Review', 'Debugging', 'Architecture', 'Best Practices'],
      responses: ['Let me help you debug that code.', 'Here\'s a more efficient approach.']
    },
    {
      id: 'ai-engineer',
      name: 'AI Engineer',
      description: 'Specializes in machine learning, AI model development and optimization',
      avatar: Cpu,
      color: 'violet',
      gradient: 'from-violet-500 to-purple-600',
      category: 'AI/ML',
      capabilities: ['Model Development', 'Data Training', 'AI Optimization', 'Neural Networks'],
      responses: ['I can help you build and optimize AI models.', 'Let\'s discuss your machine learning project.']
    },
    {
      id: 'database-admin',
      name: 'Database Administrator',
      description: 'Manages database performance, security, and optimization',
      avatar: Database,
      color: 'slate',
      gradient: 'from-slate-500 to-gray-600',
      category: 'Database',
      capabilities: ['Performance Tuning', 'Security', 'Backup Management', 'Query Optimization'],
      responses: ['I\'ll optimize your database performance.', 'Let me help with your database architecture.']
    },
    {
      id: 'cloud-architect',
      name: 'Cloud Architect',
      description: 'Designs and manages cloud infrastructure and deployment strategies',
      avatar: Cloud,
      color: 'sky',
      gradient: 'from-sky-500 to-blue-600',
      category: 'Cloud',
      capabilities: ['Cloud Design', 'Infrastructure', 'Deployment', 'Cost Optimization'],
      responses: ['I can design your cloud architecture.', 'Let me optimize your cloud infrastructure costs.']
    },
    {
      id: 'cybersecurity-expert',
      name: 'Cybersecurity Expert',
      description: 'Protects systems from security threats and vulnerabilities',
      avatar: Shield,
      color: 'red',
      gradient: 'from-red-600 to-orange-600',
      category: 'Security',
      capabilities: ['Threat Analysis', 'Vulnerability Assessment', 'Security Protocols', 'Incident Response'],
      responses: ['I\'ll analyze your security vulnerabilities.', 'Let me help strengthen your cybersecurity.']
    },
    {
      id: 'devops-engineer',
      name: 'DevOps Engineer',
      description: 'Automates deployment pipelines and manages infrastructure',
      avatar: Zap,
      color: 'amber',
      gradient: 'from-amber-500 to-yellow-600',
      category: 'DevOps',
      capabilities: ['CI/CD Pipelines', 'Infrastructure Automation', 'Monitoring', 'Deployment'],
      responses: ['I\'ll set up your deployment pipeline.', 'Let me automate your infrastructure management.']
    },

    // Data & Analytics
    {
      id: 'data-analyst',
      name: 'Data Analyst',
      description: 'Processes large datasets and generates clear analyses and recommendations',
      avatar: BarChart,
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-600',
      category: 'Analytics',
      capabilities: ['Data Processing', 'Statistical Analysis', 'Visualization', 'Insights Generation'],
      responses: ['Let me analyze your data and provide insights.', 'I can create comprehensive reports for you.']
    },
    {
      id: 'data-scientist',
      name: 'Data Scientist',
      description: 'Uses advanced analytics and machine learning for predictive insights',
      avatar: Brain,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      category: 'Data Science',
      capabilities: ['Predictive Modeling', 'Machine Learning', 'Statistical Analysis', 'Data Mining'],
      responses: ['I can build predictive models for your data.', 'Let\'s uncover hidden patterns in your dataset.']
    },

    // Support & Customer Service
    {
      id: 'customer-support',
      name: 'Customer Support Specialist',
      description: 'Provides 24/7 customer support with personalized responses',
      avatar: Users,
      color: 'green',
      gradient: 'from-green-500 to-teal-600',
      category: 'Support',
      capabilities: ['24/7 Support', 'Personalized Responses', 'Issue Resolution', 'Customer Satisfaction'],
      responses: ['How can I help you today?', 'I\'m here to resolve your issue quickly.']
    },
    {
      id: 'hr-specialist',
      name: 'HR Specialist',
      description: 'Streamlines recruitment and helps with employee onboarding',
      avatar: Users,
      color: 'sky',
      gradient: 'from-sky-500 to-blue-600',
      category: 'HR',
      capabilities: ['Recruitment', 'Onboarding', 'Strategies', 'Talent Management'],
      responses: ['I\'ll help you find ideal candidates.', 'Let\'s create an efficient recruitment process.']
    },
    {
      id: 'virtual-assistant',
      name: 'Virtual Assistant',
      description: 'Handles administrative tasks and calendar management for efficient work',
      avatar: Calendar,
      color: 'lime',
      gradient: 'from-lime-500 to-green-600',
      category: 'Administration',
      capabilities: ['Calendar Management', 'Scheduling', 'Administration', 'Organization'],
      responses: ['I\'ll organize your calendar and meetings.', 'Let me handle your administrative tasks.']
    },

    // Creative & Content
    {
      id: 'creative-director',
      name: 'Creative Director',
      description: 'Unleashes creativity with art, design, and content creation assistance',
      avatar: Palette,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600',
      category: 'Creative',
      capabilities: ['Content Creation', 'Design Ideas', 'Brainstorming', 'Art Direction'],
      responses: ['Let\'s create something amazing together!', 'I have some creative ideas for you.']
    },
    {
      id: 'video-editor',
      name: 'Video Editor',
      description: 'Creates and edits professional videos with advanced techniques',
      avatar: Video,
      color: 'red',
      gradient: 'from-red-500 to-pink-600',
      category: 'Media',
      capabilities: ['Video Editing', 'Motion Graphics', 'Color Grading', 'Audio Sync'],
      responses: ['I\'ll help you create professional videos.', 'Let me enhance your video content.']
    },
    {
      id: 'photographer',
      name: 'Photography Expert',
      description: 'Provides photography tips, editing advice, and composition guidance',
      avatar: Camera,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-600',
      category: 'Photography',
      capabilities: ['Photo Editing', 'Composition', 'Lighting', 'Equipment Advice'],
      responses: ['I can help improve your photography skills.', 'Let me guide you on composition and lighting.']
    },
    {
      id: 'music-producer',
      name: 'Music Producer',
      description: 'Assists with music production, mixing, and sound design',
      avatar: Music,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      category: 'Music',
      capabilities: ['Music Production', 'Mixing', 'Sound Design', 'Audio Mastering'],
      responses: ['Let\'s create amazing music together.', 'I can help you with mixing and production.']
    },
    {
      id: 'podcast-producer',
      name: 'Podcast Producer',
      description: 'Helps create, edit, and optimize podcast content',
      avatar: Mic,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      category: 'Audio',
      capabilities: ['Podcast Planning', 'Audio Editing', 'Content Strategy', 'Distribution'],
      responses: ['I\'ll help you create engaging podcast content.', 'Let me optimize your podcast for better reach.']
    },

    // Education & Learning
    {
      id: 'tutor',
      name: 'Personal Tutor',
      description: 'Provides personalized learning assistance across various subjects',
      avatar: GraduationCap,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      category: 'Education',
      capabilities: ['Subject Tutoring', 'Learning Plans', 'Progress Tracking', 'Skill Assessment'],
      responses: ['I\'m here to help you learn and grow.', 'Let\'s create a personalized learning plan.']
    },
    {
      id: 'language-teacher',
      name: 'Language Teacher',
      description: 'Teaches languages with interactive lessons and conversation practice',
      avatar: Globe,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      category: 'Language',
      capabilities: ['Language Learning', 'Conversation Practice', 'Grammar', 'Pronunciation'],
      responses: ['Let\'s practice your language skills!', 'I can help you become fluent in any language.']
    },
    {
      id: 'writing-coach',
      name: 'Writing Coach',
      description: 'Improves writing skills for academic, creative, and professional purposes',
      avatar: FileText,
      color: 'slate',
      gradient: 'from-slate-500 to-gray-600',
      category: 'Writing',
      capabilities: ['Writing Improvement', 'Grammar Check', 'Style Guide', 'Creative Writing'],
      responses: ['I\'ll help you become a better writer.', 'Let me review and improve your writing.']
    },

    // Health & Wellness
    {
      id: 'fitness-trainer',
      name: 'Fitness Trainer',
      description: 'Creates personalized workout plans and fitness guidance',
      avatar: Dumbbell,
      color: 'red',
      gradient: 'from-red-500 to-orange-600',
      category: 'Fitness',
      capabilities: ['Workout Plans', 'Exercise Form', 'Nutrition Advice', 'Progress Tracking'],
      responses: ['Let\'s create a fitness plan that works for you.', 'I\'ll help you reach your fitness goals.']
    },
    {
      id: 'nutrition-coach',
      name: 'Nutrition Coach',
      description: 'Provides dietary advice and meal planning for healthy living',
      avatar: Utensils,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      category: 'Nutrition',
      capabilities: ['Meal Planning', 'Dietary Advice', 'Nutrition Analysis', 'Health Goals'],
      responses: ['I\'ll help you create healthy meal plans.', 'Let me guide you towards better nutrition.']
    },
    {
      id: 'mental-health-coach',
      name: 'Mental Health Coach',
      description: 'Provides mental wellness support and stress management techniques',
      avatar: Heart,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600',
      category: 'Wellness',
      capabilities: ['Stress Management', 'Mindfulness', 'Emotional Support', 'Wellness Plans'],
      responses: ['I\'m here to support your mental wellness.', 'Let\'s work on stress management techniques.']
    },

    // Lifestyle & Personal
    {
      id: 'travel-planner',
      name: 'Travel Planner',
      description: 'Plans trips, finds deals, and provides travel recommendations',
      avatar: Plane,
      color: 'sky',
      gradient: 'from-sky-500 to-cyan-600',
      category: 'Travel',
      capabilities: ['Trip Planning', 'Deal Finding', 'Recommendations', 'Itinerary Creation'],
      responses: ['Let me plan your perfect trip!', 'I can find the best travel deals for you.']
    },
    {
      id: 'real-estate-advisor',
      name: 'Real Estate Advisor',
      description: 'Assists with property search, market analysis, and investment advice',
      avatar: Home,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      category: 'Real Estate',
      capabilities: ['Property Search', 'Market Analysis', 'Investment Advice', 'Negotiation'],
      responses: ['I\'ll help you find the perfect property.', 'Let me analyze the real estate market for you.']
    },
    {
      id: 'automotive-expert',
      name: 'Automotive Expert',
      description: 'Provides car buying advice, maintenance tips, and automotive knowledge',
      avatar: Car,
      color: 'gray',
      gradient: 'from-gray-500 to-slate-600',
      category: 'Automotive',
      capabilities: ['Car Buying', 'Maintenance', 'Repair Advice', 'Market Analysis'],
      responses: ['I can help you choose the right car.', 'Let me guide you on car maintenance.']
    },
    {
      id: 'personal-coach',
      name: 'Personal Coach',
      description: 'Supports personal development and creates plans to improve productivity',
      avatar: User,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      category: 'Development',
      capabilities: ['Personal Growth', 'Productivity', 'Motivation', 'Goal Setting'],
      responses: ['I\'ll help you achieve your goals.', 'Let\'s create a plan for your personal growth.']
    },

    // Gaming & Entertainment
    {
      id: 'game-designer',
      name: 'Game Designer',
      description: 'Helps design games, balance mechanics, and create engaging experiences',
      avatar: Gamepad2,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      category: 'Gaming',
      capabilities: ['Game Design', 'Mechanics', 'Storytelling', 'User Experience'],
      responses: ['Let\'s design an amazing game together!', 'I can help balance your game mechanics.']
    },

    // Specialized Services
    {
      id: 'legal-advisor',
      name: 'Legal Advisor',
      description: 'Provides general legal information and guidance',
      avatar: BookOpen,
      color: 'slate',
      gradient: 'from-slate-600 to-gray-700',
      category: 'Legal',
      capabilities: ['Legal Research', 'Document Review', 'Contract Analysis', 'Compliance'],
      responses: ['I can help you understand legal concepts.', 'Let me review your legal documents.']
    },
    {
      id: 'event-planner',
      name: 'Event Planner',
      description: 'Organizes events from conception to execution',
      avatar: Calendar,
      color: 'rose',
      gradient: 'from-rose-500 to-pink-600',
      category: 'Events',
      capabilities: ['Event Planning', 'Vendor Management', 'Budget Planning', 'Timeline Creation'],
      responses: ['I\'ll help you plan the perfect event.', 'Let me organize every detail for you.']
    },
    {
      id: 'research-assistant',
      name: 'Research Assistant',
      description: 'Conducts thorough research and provides detailed analysis',
      avatar: Search,
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-600',
      category: 'Research',
      capabilities: ['Data Research', 'Analysis', 'Report Writing', 'Fact Checking'],
      responses: ['I\'ll research any topic thoroughly for you.', 'Let me provide detailed analysis on your subject.']
    }
  ];

  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const categories = [...new Set(bots.map(bot => bot.category))];
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

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={() => setSearchTerm('')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      searchTerm === '' 
                        ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                        : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSearchTerm(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        searchTerm === category
                          ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                          : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBots.map((bot, index) => {
                    const IconComponent = bot.avatar;
                    return (
                      <motion.div
                        key={bot.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 shadow-lg border hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
                        onClick={() => onSelectBot(bot)}
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${bot.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        
                        <div className="mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {bot.category}
                          </span>
                        </div>
                        
                        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {bot.name}
                        </h3>
                        
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed text-sm`}>
                          {bot.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {bot.capabilities.slice(0, 2).map((capability) => (
                            <span
                              key={capability}
                              className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                            >
                              {capability}
                            </span>
                          ))}
                          {bot.capabilities.length > 2 && (
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                              +{bot.capabilities.length - 2} more
                            </span>
                          )}
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
