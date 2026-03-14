import React, { useState } from 'react';
import { 
  User, 
  Globe, 
  Bell, 
  Shield, 
  CreditCard, 
  MessageSquare, 
  Save,
  Camera,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Settings as SettingsIcon,
  CheckCircle2,
  TrendingUp,
  UserPlus,
  MessageCircle,
  MousePointer2
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useNotifications } from '../contexts/NotificationContext';

const tabs = [
  { id: 'general', label: 'Geral', icon: Globe },
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'chatbot', label: 'Chatbot', icon: MessageSquare },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'security', label: 'Segurança', icon: Shield },
  { id: 'billing', label: 'Assinatura', icon: CreditCard },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const { settings, updateSettings, showNotification } = useNotifications();

  const handleToggle = (key: keyof typeof settings) => {
    updateSettings({ [key]: !settings[key] });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ volume: parseInt(e.target.value) });
  };

  const testNotification = (type: 'lead' | 'sale' | 'conversation' | 'activity') => {
    const messages = {
      lead: { title: 'Novo Lead!', message: 'Alguém se cadastrou agora.', type: 'lead' as const },
      sale: { title: 'Venda Realizada!', message: 'Pagamento aprovado: R$ 197,00', type: 'sale' as const },
      conversation: { title: 'Nova Mensagem', message: 'Cliente aguardando no chat.', type: 'conversation' as const },
      activity: { title: 'Funil Ativo', message: 'Visitante iniciou o checkout.', type: 'activity' as const },
    };
    showNotification(messages[type]);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Configurações</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Gerencie as preferências da sua conta e da plataforma.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs Sidebar */}
        <aside className="w-full lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === tab.id 
                  ? "bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/20" 
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              )}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          {activeTab === 'general' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-6">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Informações da Plataforma</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Configure como sua plataforma aparece para os clientes.</p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold py-2 px-4 rounded-xl text-sm flex items-center gap-2 transition-all">
                  <Save className="w-4 h-4" />
                  Salvar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Nome da Plataforma</label>
                  <input 
                    type="text" 
                    defaultValue="Bot.AI Vendas"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">URL Personalizada</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-sm">
                      botai.vendas/
                    </span>
                    <input 
                      type="text" 
                      defaultValue="meu-negocio"
                      className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-r-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Logo da Plataforma</label>
                  <div className="flex items-center gap-6 p-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                      <img 
                        src="https://i.pinimg.com/736x/54/77/a1/5477a1ebebe71d381043dd85ee2a0e65.jpg" 
                        alt="Logo Preview" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 mb-2">
                        <Camera className="w-4 h-4" />
                        Alterar Logo
                      </button>
                      <p className="text-xs text-zinc-500">Recomendado: 512x512px. PNG ou SVG.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900">
                <h3 className="text-md font-bold text-zinc-900 dark:text-white mb-4">Integrações de Checkout</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">H</div>
                      <div>
                        <p className="text-sm font-bold">Hotmart</p>
                        <p className="text-xs text-zinc-500">Conectado via Webhook</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Configurar</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">K</div>
                      <div>
                        <p className="text-sm font-bold">Kiwify</p>
                        <p className="text-xs text-zinc-500">Não conectado</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-orange-500 hover:text-orange-400">Conectar</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-6">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Preferências de Notificação</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Controle como e quando você recebe alertas visuais.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleToggle('demoMode')}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all",
                      settings.demoMode 
                        ? "bg-orange-500 text-zinc-950" 
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    )}
                  >
                    <Play className="w-3 h-3" />
                    {settings.demoMode ? 'Desativar Demo' : 'Modo Demonstração'}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Tipos de Alerta</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NotificationToggle 
                    icon={TrendingUp} 
                    label="Notificações de Vendas" 
                    description="Receba alertas quando uma venda for aprovada."
                    active={settings.sales}
                    onToggle={() => handleToggle('sales')}
                    color="text-orange-500"
                  />
                  <NotificationToggle 
                    icon={UserPlus} 
                    label="Notificações de Novos Leads" 
                    description="Receba alertas quando um novo lead for capturado."
                    active={settings.leads}
                    onToggle={() => handleToggle('leads')}
                    color="text-blue-500"
                  />
                  <NotificationToggle 
                    icon={MousePointer2} 
                    label="Atividade do Funil" 
                    description="Receba alertas sobre o progresso nos funis."
                    active={settings.funnel}
                    onToggle={() => handleToggle('funnel')}
                    color="text-orange-500"
                  />
                  <NotificationToggle 
                    icon={MessageCircle} 
                    label="Novas Conversas" 
                    description="Receba alertas quando um lead iniciar o chat."
                    active={settings.conversations}
                    onToggle={() => handleToggle('conversations')}
                    color="text-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-zinc-100 dark:border-zinc-900">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Som e Efeitos</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center">
                        {settings.sound ? <Volume2 className="w-5 h-5 text-zinc-600 dark:text-zinc-400" /> : <VolumeX className="w-5 h-5 text-red-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">Som de Notificação</p>
                        <p className="text-xs text-zinc-500">Tocar um alerta sonoro ao receber notificações.</p>
                      </div>
                    </div>
                    <Toggle active={settings.sound} onToggle={() => handleToggle('sound')} />
                  </div>

                  {settings.sound && (
                    <div className="pl-14 space-y-2">
                      <div className="flex justify-between text-xs font-medium text-zinc-500">
                        <span>Volume</span>
                        <span>{settings.volume}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={settings.volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center">
                        <Zap className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">Animações Suaves</p>
                        <p className="text-xs text-zinc-500">Ativar efeitos de deslize e fade nas notificações.</p>
                      </div>
                    </div>
                    <Toggle active={settings.animations} onToggle={() => handleToggle('animations')} />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Testar Sistema</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => testNotification('sale')} className="px-4 py-2 bg-orange-500/10 text-orange-500 rounded-xl text-xs font-bold hover:bg-orange-500/20 transition-all">Teste Venda</button>
                  <button onClick={() => testNotification('lead')} className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl text-xs font-bold hover:bg-blue-500/20 transition-all">Teste Lead</button>
                  <button onClick={() => testNotification('conversation')} className="px-4 py-2 bg-purple-500/10 text-purple-500 rounded-xl text-xs font-bold hover:bg-purple-500/20 transition-all">Teste Chat</button>
                  <button onClick={() => testNotification('activity')} className="px-4 py-2 bg-orange-500/10 text-orange-500 rounded-xl text-xs font-bold hover:bg-orange-500/20 transition-all">Teste Funil</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== 'general' && activeTab !== 'notifications' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                <SettingsIcon className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
              </div>
              <h3 className="text-lg font-bold">Página em Construção</h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto mt-2">
                Estamos trabalhando para trazer as melhores opções de {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} para você.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationToggle({ icon: Icon, label, description, active, onToggle, color, disabled }: any) {
  return (
    <div className={cn(
      "p-4 rounded-2xl border transition-all flex items-start gap-4",
      active ? "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" : "bg-transparent border-zinc-100 dark:border-zinc-900 opacity-60",
      disabled && "cursor-not-allowed"
    )}>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white dark:bg-zinc-800 shadow-sm", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm font-bold text-zinc-900 dark:text-white">{label}</p>
          {!disabled && <Toggle active={active} onToggle={onToggle} />}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function Toggle({ active, onToggle }: { active: boolean, onToggle: () => void }) {
  return (
    <button 
      onClick={onToggle}
      className={cn(
        "w-10 h-5 rounded-full relative transition-colors duration-200 ease-in-out outline-none",
        active ? "bg-orange-500" : "bg-zinc-300 dark:bg-zinc-700"
      )}
    >
      <div className={cn(
        "absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out",
        active ? "translate-x-5" : "translate-x-0"
      )} />
    </button>
  );
}

