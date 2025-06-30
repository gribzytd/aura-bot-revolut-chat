
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  MessageSquare, 
  Bot, 
  History, 
  Settings, 
  User, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Plus
} from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
  user: UserType | null;
}

const Sidebar = ({ collapsed, onToggle, onLogout, user }: SidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { id: 'chat', path: '/', icon: MessageSquare, label: 'Chat', badge: null },
    { id: 'bots', path: '/bots', icon: Bot, label: 'AI Bots', badge: '8' },
    { id: 'history', path: '/history', icon: History, label: 'History', badge: null },
    { id: 'settings', path: '/settings', icon: Settings, label: 'Settings', badge: null },
    { id: 'account', path: '/account', icon: User, label: 'Account', badge: null },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl z-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!collapsed && (
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Neural AI
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
            collapsed ? 'p-3' : 'p-4'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium"
                >
                  New Chat
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 relative group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center justify-between flex-1"
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Tooltip for collapsed state */}
                  <AnimatePresence>
                    {collapsed && hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50"
                      >
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200/50">
        <AnimatePresence>
          {!collapsed && user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onLogout}
          className={`w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
