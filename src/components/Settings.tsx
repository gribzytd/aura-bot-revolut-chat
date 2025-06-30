
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Zap, 
  Eye,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: false,
      sound: true,
      desktop: true
    },
    appearance: {
      theme: 'system',
      fontSize: [16],
      animations: true,
      compactMode: false
    },
    privacy: {
      dataCollection: false,
      analytics: true,
      crashReports: true
    },
    performance: {
      autoSave: true,
      lowPowerMode: false,
      cacheSize: [5]
    }
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const settingsSections = [
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          key: 'push',
          label: 'Push Notifications',
          description: 'Receive notifications on your device',
          type: 'switch'
        },
        {
          key: 'email',
          label: 'Email Notifications',
          description: 'Get updates via email',
          type: 'switch'
        },
        {
          key: 'sound',
          label: 'Sound Effects',
          description: 'Play sounds for notifications',
          type: 'switch'
        },
        {
          key: 'desktop',
          label: 'Desktop Notifications',
          description: 'Show notifications on desktop',
          type: 'switch'
        }
      ]
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      items: [
        {
          key: 'theme',
          label: 'Theme',
          description: 'Choose your preferred theme',
          type: 'select',
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' }
          ]
        },
        {
          key: 'fontSize',
          label: 'Font Size',
          description: 'Adjust text size for better readability',
          type: 'slider',
          range: [12, 24]
        },
        {
          key: 'animations',
          label: 'Animations',
          description: 'Enable smooth animations and transitions',
          type: 'switch'
        },
        {
          key: 'compactMode',
          label: 'Compact Mode',
          description: 'Use less space for interface elements',
          type: 'switch'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        {
          key: 'dataCollection',
          label: 'Data Collection',
          description: 'Allow collection of usage data',
          type: 'switch'
        },
        {
          key: 'analytics',
          label: 'Analytics',
          description: 'Help improve our service with analytics',
          type: 'switch'
        },
        {
          key: 'crashReports',
          label: 'Crash Reports',
          description: 'Automatically send crash reports',
          type: 'switch'
        }
      ]
    },
    {
      id: 'performance',
      title: 'Performance',
      icon: Zap,
      items: [
        {
          key: 'autoSave',
          label: 'Auto Save',
          description: 'Automatically save your conversations',
          type: 'switch'
        },
        {
          key: 'lowPowerMode',
          label: 'Low Power Mode',
          description: 'Reduce animations and background processes',
          type: 'switch'
        },
        {
          key: 'cacheSize',
          label: 'Cache Size (GB)',
          description: 'Amount of data to cache locally',
          type: 'slider',
          range: [1, 10]
        }
      ]
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
            Settings
          </h1>
          <p className="text-xl text-gray-600">
            Customize your Neural AI experience
          </p>
        </motion.div>

        <div className="space-y-8">
          {settingsSections.map((section, sectionIndex) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                      className="flex items-center justify-between py-4 border-b border-gray-200/50 last:border-b-0"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {item.label}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </div>

                      <div className="ml-6">
                        {item.type === 'switch' && (
                          <Switch
                            checked={settings[section.id as keyof typeof settings][item.key as keyof typeof settings.notifications]}
                            onCheckedChange={(checked) => updateSetting(section.id, item.key, checked)}
                          />
                        )}

                        {item.type === 'select' && (
                          <Select
                            value={settings[section.id as keyof typeof settings][item.key as keyof typeof settings.appearance] as string}
                            onValueChange={(value) => updateSetting(section.id, item.key, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {item.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}

                        {item.type === 'slider' && (
                          <div className="w-32">
                            <Slider
                              value={settings[section.id as keyof typeof settings][item.key as keyof typeof settings.appearance] as number[]}
                              onValueChange={(value) => updateSetting(section.id, item.key, value)}
                              max={item.range?.[1]}
                              min={item.range?.[0]}
                              step={1}
                            />
                            <div className="text-center text-sm text-gray-500 mt-1">
                              {settings[section.id as keyof typeof settings][item.key as keyof typeof settings.appearance]?.[0]}
                              {item.key === 'cacheSize' && ' GB'}
                              {item.key === 'fontSize' && 'px'}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex space-x-4 mt-8"
        >
          <Button
            variant="outline"
            className="flex-1 py-3 hover:bg-gray-50"
          >
            Reset to Defaults
          </Button>
          <Button
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Save Changes
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
