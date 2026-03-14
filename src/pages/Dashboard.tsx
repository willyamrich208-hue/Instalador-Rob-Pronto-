import React from 'react';
import { 
  Users, 
  UserPlus, 
  Target, 
  TrendingUp, 
  GitFork,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'motion/react';
import { useNotifications } from '../contexts/NotificationContext';

const data = [
  { name: 'Seg', visitantes: 400, leads: 240, conversões: 24 },
  { name: 'Ter', visitantes: 300, leads: 139, conversões: 13 },
  { name: 'Qua', visitantes: 200, leads: 980, conversões: 98 },
  { name: 'Qui', visitantes: 278, leads: 390, conversões: 39 },
  { name: 'Sex', visitantes: 189, leads: 480, conversões: 48 },
  { name: 'Sáb', visitantes: 239, leads: 380, conversões: 38 },
  { name: 'Dom', visitantes: 349, leads: 430, conversões: 43 },
];

const stats = [
  { label: 'Visitantes', value: '12,450', change: '+12.5%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Leads Capturados', value: '1,284', change: '+18.2%', icon: UserPlus, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { label: 'Conversões', value: '156', change: '+4.3%', icon: Target, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { label: 'Taxa de Conversão', value: '12.1%', change: '-2.1%', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { label: 'Funis Ativos', value: '8', change: '0%', icon: GitFork, color: 'text-pink-500', bg: 'bg-pink-500/10' },
];

const activities = [
  { id: 1, type: 'lead', user: 'João Silva', action: 'se tornou um novo lead', time: '2 min atrás', avatar: 'JS' },
  { id: 2, type: 'conversion', user: 'Maria Oliveira', action: 'completou uma compra', time: '15 min atrás', avatar: 'MO' },
  { id: 3, type: 'funnel', user: 'Sistema', action: 'Funil "Lançamento X" atingiu 500 leads', time: '1 hora atrás', avatar: 'AI' },
  { id: 4, type: 'lead', user: 'Pedro Santos', action: 'se tornou um novo lead', time: '2 horas atrás', avatar: 'PS' },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Bem-vindo de volta! Aqui está o que está acontecendo hoje.</p>
        </div>
      </header>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={stat.change.startsWith('+') ? 'text-orange-500 text-xs font-medium flex items-center' : 'text-red-500 text-xs font-medium flex items-center'}>
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Tráfego e Leads</h2>
            <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="visitantes" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVis)" strokeWidth={2} />
                <Area type="monotone" dataKey="leads" stroke="#10b981" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Atividade Recente</h2>
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-400 shrink-0">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-900 dark:text-white">
                    <span className="font-bold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors border border-orange-500/20 rounded-xl hover:bg-orange-500/5">
            Ver todas as atividades
          </button>
        </div>
      </div>
    </div>
  );
}
