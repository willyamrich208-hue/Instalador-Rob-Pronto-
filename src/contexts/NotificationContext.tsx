import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  CheckCircle2, 
  MessageSquare, 
  Zap, 
  X, 
  TrendingUp, 
  UserPlus, 
  MessageCircle,
  MousePointer2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cn } from '../lib/utils';
import { NotificationSettings } from '../types';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'conversation' | 'activity' | 'sale';
  time: string;
}

interface NotificationContextType {
  showNotification: (notification: Omit<Notification, 'id' | 'time'>) => void;
  settings: NotificationSettings;
  updateSettings: (newSettings: Partial<NotificationSettings>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const defaultSettings: NotificationSettings = {
  sales: true,
  leads: true,
  funnel: true,
  conversations: true,
  sound: true,
  animations: true,
  demoMode: false,
  volume: 50,
  silentMode: false,
};

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('botai-notifications');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('botai-notifications', JSON.stringify(settings));
  }, [settings]);

  const playSound = useCallback(() => {
    if (settings.sound && !settings.silentMode) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.volume = settings.volume / 100;
      audio.play().catch(() => {});
    }
  }, [settings]);

  const showNotification = useCallback((notification: Omit<Notification, 'id' | 'time'>) => {
    // Filter based on settings
    if (notification.type === 'lead' && !settings.leads) return;
    if (notification.type === 'sale' && !settings.sales) return;
    if (notification.type === 'activity' && !settings.funnel) return;
    if (notification.type === 'conversation' && !settings.conversations) return;

    const id = Math.random().toString(36).substring(7);
    const time = 'Agora';
    
    setNotifications(prev => [...prev, { ...notification, id, time }]);
    playSound();

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, [settings, playSound]);

  // Demo Mode Logic
  useEffect(() => {
    if (!settings.demoMode) return;

    const demoEvents = [
      { title: 'Novo Lead Capturado', message: 'Alguém acabou de se cadastrar', type: 'lead' as const },
      { title: 'Nova Conversa Iniciada', message: 'Um visitante chamou no chat', type: 'conversation' as const },
      { title: 'Atividade no Funil', message: 'Visitante entrou no funil principal', type: 'activity' as const },
      { title: 'Conversão Registrada', message: 'Venda aprovada: R$ 97,00', type: 'sale' as const },
    ];

    const interval = setInterval(() => {
      const randomEvent = demoEvents[Math.floor(Math.random() * demoEvents.length)];
      showNotification(randomEvent);
    }, 8000 + Math.random() * 10000); // Random interval between 8-18 seconds

    return () => clearInterval(interval);
  }, [settings.demoMode, showNotification]);

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification, settings, updateSettings }}>
      {children}
      
      {/* Demo Mode Indicator */}
      {settings.demoMode && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
          <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/20 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Modo Demonstração Ativo</span>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none max-w-[calc(100vw-3rem)]">
        <AnimatePresence mode="popLayout">
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={settings.animations ? { opacity: 0, x: 50, scale: 0.9 } : { opacity: 1, x: 0, scale: 1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={settings.animations ? { opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } } : { opacity: 0 }}
              layout
              className="pointer-events-auto w-full sm:w-85 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-2xl flex gap-4 group relative overflow-hidden"
            >
              {/* Progress Bar */}
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className={cn(
                  "absolute bottom-0 left-0 h-1 opacity-20",
                  n.type === 'lead' ? "bg-blue-500" :
                  n.type === 'sale' ? "bg-orange-500" :
                  n.type === 'conversation' ? "bg-purple-500" :
                  "bg-orange-500"
                )}
              />

              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110",
                n.type === 'lead' ? "bg-blue-500/10 text-blue-500" :
                n.type === 'sale' ? "bg-orange-500/10 text-orange-500" :
                n.type === 'conversation' ? "bg-purple-500/10 text-purple-500" :
                "bg-orange-500/10 text-orange-500"
              )}>
                {n.type === 'lead' ? <UserPlus className="w-6 h-6" /> :
                 n.type === 'sale' ? <TrendingUp className="w-6 h-6" /> :
                 n.type === 'conversation' ? <MessageCircle className="w-6 h-6" /> :
                 <MousePointer2 className="w-6 h-6" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate pr-4">
                    {n.title}
                  </h4>
                  <span className="text-[10px] font-medium text-zinc-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                  {n.message}
                </p>
              </div>

              <button 
                onClick={() => removeNotification(n.id)}
                className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};

