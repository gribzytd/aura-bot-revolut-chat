
import { motion } from 'framer-motion';
import { Bot } from '../types';
import { Brain, Code, Palette, BookOpen, Calculator, Music, Camera, Gamepad2 } from 'lucide-react';

interface BotSelectionProps {
  onSelectBot: (bot: Bot) => void;
}

const BotSelection = ({ onSelectBot }: BotSelectionProps) => {
  const bots: Bot[] = [
    {
      id: 'brain-ai',
      name: 'Brain AI',
      description: 'Your intelligent general-purpose assistant for any question or task',
      avatar: Brain,
      color: 'blue',
      gradient: 'from-blue-500 to-purple-600',
      category: 'General',
      capabilities: ['General Knowledge', 'Problem Solving', 'Analysis', 'Writing'],
      responses: [
        "I'm here to help with any question you have!",
        "Let me analyze that for you...",
        "That's an interesting question. Here's my perspective...",
        "I can help you break this down step by step."
      ]
    },
    {
      id: 'code-assistant',
      name: 'Code Assistant',
      description: 'Expert programming help for development, debugging, and code review',
      avatar: Code,
      color: 'green',
      gradient: 'from-green-500 to-teal-600',
      category: 'Development',
      capabilities: ['Code Review', 'Debugging', 'Architecture', 'Best Practices'],
      responses: [
        "Let me help you debug that code...",
        "Here's a more efficient approach...",
        "I can optimize this for better performance...",
        "Let's refactor this to make it more maintainable."
      ]
    },
    {
      id: 'creative-bot',
      name: 'Creative Bot',
      description: 'Unleash creativity with art, design, and content creation assistance',
      avatar: Palette,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600',
      category: 'Creative',
      capabilities: ['Content Creation', 'Design Ideas', 'Brainstorming', 'Art Direction'],
      responses: [
        "Let's create something amazing together!",
        "I have some creative ideas for you...",
        "Here's a fresh perspective on your project...",
        "Let's think outside the box!"
      ]
    },
    {
      id: 'research-bot',
      name: 'Research Bot',
      description: 'Deep research and analysis for academic and professional projects',
      avatar: BookOpen,
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-600',
      category: 'Research',
      capabilities: ['Research', 'Analysis', 'Citations', 'Fact-checking'],
      responses: [
        "I'll help you research this thoroughly...",
        "Based on my analysis of the data...",
        "Here are the key findings...",
        "Let me cross-reference multiple sources..."
      ]
    },
    {
      id: 'math-bot',
      name: 'Math Bot',
      description: 'Advanced mathematics, calculations, and problem-solving assistance',
      avatar: Calculator,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      category: 'Mathematics',
      capabilities: ['Calculations', 'Problem Solving', 'Statistics', 'Formulas'],
      responses: [
        "Let me solve this step by step...",
        "Here's the mathematical approach...",
        "The calculation shows...",
        "Let me break down this formula..."
      ]
    },
    {
      id: 'music-bot',
      name: 'Music Bot',
      description: 'Music theory, composition, and audio production guidance',
      avatar: Music,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      category: 'Music',
      capabilities: ['Music Theory', 'Composition', 'Production', 'Instruments'],
      responses: [
        "Let's create some musical magic...",
        "Here's a chord progression idea...",
        "The harmony suggests...",
        "Try this rhythm pattern..."
      ]
    },
    {
      id: 'photo-bot',
      name: 'Photo Bot',
      description: 'Photography tips, editing advice, and visual composition guidance',
      avatar: Camera,
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600',
      category: 'Photography',
      capabilities: ['Composition', 'Editing', 'Lighting', 'Equipment'],
      responses: [
        "Great shot! Here's how to improve it...",
        "The lighting in this image...",
        "Try adjusting the composition...",
        "This editing technique will enhance..."
      ]
    },
    {
      id: 'game-bot',
      name: 'Game Bot',
      description: 'Gaming strategies, reviews, and game development insights',
      avatar: Gamepad2,
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-600',
      category: 'Gaming',
      capabilities: ['Strategy', 'Reviews', 'Development', 'Tips'],
      responses: [
        "Here's a winning strategy...",
        "This game mechanic works because...",
        "Try this approach for better results...",
        "The meta suggests..."
      ]
    }
  ];

  const categories = [...new Set(bots.map(bot => bot.category))];

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Choose Your AI Assistant
          </h1>
          <p className="text-xl text-gray-600">
            Select from our specialized AI bots, each designed for specific tasks and expertise
          </p>
        </motion.div>

        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{category}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bots.filter(bot => bot.category === category).map((bot, index) => {
                const IconComponent = bot.avatar;
                return (
                  <motion.div
                    key={bot.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectBot(bot)}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/50 group"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${bot.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{bot.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{bot.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {bot.capabilities.slice(0, 2).map((capability) => (
                        <span
                          key={capability}
                          className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${bot.gradient} text-white rounded-full`}
                        >
                          {capability}
                        </span>
                      ))}
                      {bot.capabilities.length > 2 && (
                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          +{bot.capabilities.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 px-4 bg-gradient-to-r ${bot.gradient} text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Start Chatting
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BotSelection;
