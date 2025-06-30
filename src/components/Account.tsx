
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  CreditCard, 
  Download,
  Trash2,
  Edit3,
  Crown,
  Zap
} from 'lucide-react';
import { User as UserType } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface AccountProps {
  user: UserType | null;
  onUpdateUser: (user: UserType) => void;
}

const Account = ({ user, onUpdateUser }: AccountProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email
      };
      onUpdateUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Mock usage data
  const usageData = {
    messagesThisMonth: 247,
    messageLimit: 1000,
    storageUsed: 2.3,
    storageLimit: 10,
    subscription: 'Pro',
    subscriptionExpiry: new Date('2024-08-15')
  };

  const accountSections = [
    {
      title: 'Profile Information',
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="bg-white/60 border-gray-200/50"
                  />
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="bg-white/60 border-gray-200/50"
                  />
                  <div className="flex space-x-3">
                    <Button onClick={handleSave} size="sm">
                      Save Changes
                    </Button>
                    <Button 
                      onClick={() => setIsEditing(false)} 
                      variant="outline" 
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                    <Badge variant="secondary" className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700">
                      <Crown className="w-3 h-3 mr-1" />
                      {usageData.subscription}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{user?.email}</p>
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-blue-50"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200/50">
            <div className="flex items-center space-x-3 text-gray-600">
              <Calendar className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-xs">{user?.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Shield className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">Account Status</p>
                <p className="text-xs text-green-600">Verified</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Usage & Billing',
      icon: CreditCard,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Messages This Month</span>
                <Badge variant="outline">{usageData.messagesThisMonth}/{usageData.messageLimit}</Badge>
              </div>
              <Progress 
                value={(usageData.messagesThisMonth / usageData.messageLimit) * 100} 
                className="h-2"
              />
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Storage Used</span>
                <Badge variant="outline">{usageData.storageUsed}GB/{usageData.storageLimit}GB</Badge>
              </div>
              <Progress 
                value={(usageData.storageUsed / usageData.storageLimit) * 100} 
                className="h-2"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-orange-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Pro Subscription</h3>
                <p className="text-sm text-gray-600">
                  Expires on {usageData.subscriptionExpiry.toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  Manage Billing
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500">
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Data & Privacy',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 hover:bg-blue-50">
              <Download className="w-5 h-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Export Data</p>
                <p className="text-xs text-gray-500">Download your chat history</p>
              </div>
            </Button>

            <Button variant="outline" className="h-12 hover:bg-gray-50">
              <Shield className="w-5 h-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Privacy Settings</p>
                <p className="text-xs text-gray-500">Manage data preferences</p>
              </div>
            </Button>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Danger Zone</h3>
            <p className="text-sm text-red-700 mb-4">
              These actions are permanent and cannot be undone.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete All Chat History
              </Button>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Account Settings
          </h1>
          <p className="text-xl text-gray-600">
            Manage your profile, billing, and privacy settings
          </p>
        </motion.div>

        <div className="space-y-8">
          {accountSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                </div>
                {section.content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Account;
