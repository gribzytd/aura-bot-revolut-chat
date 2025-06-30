
import { motion } from 'framer-motion';
import { Bot } from '../types';
import { 
  Brain, Code, Palette, BookOpen, Calculator, Music, Camera, Gamepad2,
  Share2, Headphones, BarChart3, TrendingUp, PenTool, Search,
  ShoppingCart, Mail, User, Users, Calendar, Target
} from 'lucide-react';

interface BotSelectionProps {
  onSelectBot: (bot: Bot) => void;
}

const BotSelection = ({ onSelectBot }: BotSelectionProps) => {
  const bots: Bot[] = [
    // English Bots
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
    // Slovak Bots
    {
      id: 'social-media-manager',
      name: 'Sociálny médiový manažér',
      description: 'Automaticky vytvára a plánuje príspevky na sociálne siete, reaguje na komentáre a sleduje trendy',
      avatar: Share2,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      category: 'Marketing',
      capabilities: ['Tvorba obsahu', 'Plánovanie príspevkov', 'Sledovanie trendov', 'Správa komentárov'],
      responses: [
        "Vytvorím pre vás pútavý obsah na sociálne siete...",
        "Naplánujem vašu kampaň pre maximálny dosah...",
        "Sledujem aktuálne trendy vo vašom odvetví...",
        "Pripravím stratégiu pre zvýšenie engagementu..."
      ]
    },
    {
      id: 'customer-support',
      name: 'Špecialista na zákaznícku podporu',
      description: 'Poskytuje nepretržitú podporu zákazníkom s personalizovanými odpoveďami',
      avatar: Headphones,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      category: 'Podpora',
      capabilities: ['24/7 podpora', 'Personalizované odpovede', 'Riešenie problémov', 'Eskalácia'],
      responses: [
        "Som tu, aby som vám pomohol s vaším problémom...",
        "Rozumiem vašej situácii, vyriešime to spolu...",
        "Nájdem pre vás najlepšie riešenie...",
        "Váš problém je môjou prioritou..."
      ]
    },
    {
      id: 'data-analyst',
      name: 'Dátový analytik',
      description: 'Spracováva veľké množstvá dát a generuje prehľadné analýzy a odporúčania',
      avatar: BarChart3,
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-600',
      category: 'Analýzy',
      capabilities: ['Analýza dát', 'Vizualizácia', 'Predikcie', 'Odporúčania'],
      responses: [
        "Analyzujem vaše dáta a pripravím prehľadný report...",
        "Na základe dát odporúčam nasledujúce kroky...",
        "Trendy ukazujú zaujímavé možnosti...",
        "Vytvorím pre vás detailnú analýzu..."
      ]
    },
    {
      id: 'business-developer',
      name: 'Obchodný rozvojár',
      description: 'Pomáha pri hľadaní nových obchodných príležitostí a generovaní leadov',
      avatar: TrendingUp,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      category: 'Obchod',
      capabilities: ['Hľadanie príležitostí', 'Generovanie leadov', 'Stratégie', 'Analýza trhu'],
      responses: [
        "Identifikoval som nové obchodné príležitosti...",
        "Pripravím stratégiu pre expanziu na trh...",
        "Našiel som potenciálnych partnerov...",
        "Analyzujem konkurenčné prostredie..."
      ]
    },
    {
      id: 'copywriter',
      name: 'Copywriter',
      description: 'Vytvára pútavé texty pre webové stránky, reklamy, blogy a ďalšie kanály',
      avatar: PenTool,
      color: 'rose',
      gradient: 'from-rose-500 to-pink-600',
      category: 'Marketing',
      capabilities: ['Tvorba textov', 'Reklamné texty', 'Blog články', 'Webový obsah'],
      responses: [
        "Napíšem pre vás pútavý text, ktorý zaujme...",
        "Vytvorím obsah v súlade s tónom vašej značky...",
        "Pripravím kampaň, ktorá zvýši konverzie...",
        "Vaša správa bude jasná a presvedčivá..."
      ]
    },
    {
      id: 'seo-specialist',
      name: 'SEO špecialista',
      description: 'Optimalizuje online obsah a analyzuje výkonnosť webu pre lepšie pozície',
      avatar: Search,
      color: 'violet',
      gradient: 'from-violet-500 to-purple-600',
      category: 'Marketing',
      capabilities: ['Optimalizácia obsahu', 'Analýza výkonnosti', 'Keyword research', 'Technické SEO'],
      responses: [
        "Optimalizujem váš obsah pre vyhľadávače...",
        "Analyzujem výkonnosť vašej stránky...",
        "Našiel som nové kľúčové slová pre vás...",
        "Pripravím SEO stratégiu pre rast..."
      ]
    },
    {
      id: 'ecommerce-manager',
      name: 'E-commerce manažér',
      description: 'Spravuje online obchody od nastavenia produktov až po optimalizáciu predaja',
      avatar: ShoppingCart,
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-600',
      category: 'E-commerce',
      capabilities: ['Správa produktov', 'Optimalizácia predaja', 'Analýza výkonnosti', 'UX/UI'],
      responses: [
        "Optimalizujem váš online obchod pre vyššie predaje...",
        "Analyzujem správanie zákazníkov...",
        "Pripravím stratégiu pre zvýšenie konverzií...",
        "Nastavím efektívne predajné procesy..."
      ]
    },
    {
      id: 'email-marketer',
      name: 'Emailový marketér',
      description: 'Navrhuje a automatizuje emailové kampane na zvýšenie konverzií',
      avatar: Mail,
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-600',
      category: 'Marketing',
      capabilities: ['Emailové kampane', 'Automatizácia', 'Personalizácia', 'A/B testovanie'],
      responses: [
        "Vytvorím emailovú kampaň s vysokou otváracosťou...",
        "Nastavím automatické sekvence pre lepší engagement...",
        "Personalizujem správy pre každého zákazníka...",
        "Optimalizujem kampane na základe výsledkov..."
      ]
    },
    {
      id: 'personal-coach',
      name: 'Personálny kouč',
      description: 'Podporuje osobný rozvoj a vytvára plány na zlepšenie produktivity',
      avatar: User,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      category: 'Rozvoj',
      capabilities: ['Osobný rozvoj', 'Produktivita', 'Motivácia', 'Ciele'],
      responses: [
        "Pomôžem vám dosiahnuť vaše ciele...",
        "Vytvoríme plán pre váš osobný rast...",
        "Motivujem vás k dosiahnutiu úspechu...",
        "Nájdeme spôsob, ako zvýšiť vašu produktivitu..."
      ]
    },
    {
      id: 'hr-specialist',
      name: 'HR špecialista',
      description: 'Zefektívňuje nábor a pomáha s onboardovaním nových zamestnancov',
      avatar: Users,
      color: 'sky',
      gradient: 'from-sky-500 to-blue-600',
      category: 'HR',
      capabilities: ['Nábor', 'Onboarding', 'Stratégie', 'Talent management'],
      responses: [
        "Pomôžem vám nájsť ideálnych kandidátov...",
        "Vytvoríme efektívny proces náboru...",
        "Pripravím onboarding program...",
        "Analyzujem potreby vášho tímu..."
      ]
    },
    {
      id: 'virtual-assistant',
      name: 'Virtuálny asistent',
      description: 'Preberá administratívne úlohy a správu kalendára pre efektívnejšiu prácu',
      avatar: Calendar,
      color: 'lime',
      gradient: 'from-lime-500 to-green-600',
      category: 'Administratíva',
      capabilities: ['Správa kalendára', 'Plánovanie', 'Administratíva', 'Organizácia'],
      responses: [
        "Zorganizujem váš kalendár a schôdzky...",
        "Preberiem administratívne úlohy...",
        "Naplánujem vaše aktivity efektívnejšie...",
        "Pomôžem vám s organizáciou práce..."
      ]
    },
    {
      id: 'sales-expert',
      name: 'Predajný expert',
      description: 'Automatizuje predajné procesy a navrhuje stratégie na zvýšenie predaja',
      avatar: Target,
      color: 'red',
      gradient: 'from-red-500 to-rose-600',
      category: 'Predaj',
      capabilities: ['Predajné procesy', 'Lead management', 'Stratégie', 'CRM'],
      responses: [
        "Optimalizujem vaše predajné procesy...",
        "Vytvoríme stratégiu pre zvýšenie predaja...",
        "Analyzujem vašich potenciálnych zákazníkov...",
        "Nastavím efektívny predajný funnel..."
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
            Vyberte si svojho AI asistenta
          </h1>
          <p className="text-xl text-gray-600">
            Vyberte zo špecializovaných AI botov, každý navrhnutý pre konkrétne úlohy a odbornosť
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
                          +{bot.capabilities.length - 2} ďalších
                        </span>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 px-4 bg-gradient-to-r ${bot.gradient} text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Začať konverzáciu
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
