import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Play, 
  Pause, 
  Copy, 
  Trash2, 
  Edit3,
  ArrowRight,
  MousePointer2,
  MessageSquare,
  FileText,
  CreditCard,
  Layout,
  Clock,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { FunnelEditor } from '../components/FunnelEditor/FunnelEditor';

const initialFunnels = [
  { id: '1', name: 'Lançamento Ebook Fitness', status: 'active', leads: 450, conversion: '12.5%', lastUpdate: '2 horas atrás', pages: 4 },
  { id: '2', name: 'Mentoria High Ticket', status: 'inactive', leads: 120, conversion: '8.2%', lastUpdate: '1 dia atrás', pages: 3 },
  { id: '3', name: 'Curso de Marketing Digital', status: 'active', leads: 890, conversion: '15.1%', lastUpdate: '5 min atrás', pages: 6 },
];

const templates = [
  { id: 't1', name: 'Funil de Captura', description: 'Ideal para gerar leads com isca digital.', icon: MousePointer2, color: 'text-blue-500' },
  { id: 't2', name: 'Funil de Lançamento', description: 'Estratégia completa para lançamentos de produtos.', icon: Play, color: 'text-purple-500' },
  { id: 't3', name: 'Curso Online', description: 'Estrutura otimizada para venda de infoprodutos.', icon: FileText, color: 'text-orange-500' },
  { id: 't4', name: 'Venda Direta', description: 'Focado em conversão imediata e checkout.', icon: CreditCard, color: 'text-emerald-500' },
];

export function Funnels() {
  const [funnels, setFunnels] = useState(initialFunnels);
  const [isCreating, setIsCreating] = useState(false);
  const [view, setView] = useState<'library' | 'templates'>('library');

  if (isCreating) {
    return <FunnelEditor onBack={() => setIsCreating(false)} />;
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Funis de Vendas</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Planeje e visualize sua estratégia de vendas visualmente.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setView(view === 'library' ? 'templates' : 'library')}
            className="px-4 py-2.5 rounded-xl text-sm font-bold border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center gap-2"
          >
            {view === 'library' ? (
              <><Layout className="w-4 h-4" /> Ver Templates</>
            ) : (
              <><Clock className="w-4 h-4" /> Ver Salvos</>
            )}
          </button>
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-5 h-5" />
            Criar Novo Funil
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === 'library' ? (
          <motion.div 
            key="library"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {funnels.map((funnel) => (
              <motion.div
                key={funnel.id}
                className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5",
                    funnel.status === 'active' ? "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                  )}>
                    {funnel.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                    {funnel.status === 'active' ? 'Ativo' : 'Rascunho'}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{funnel.name}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">Criado {funnel.lastUpdate}</p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-xl text-center">
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider mb-1">Páginas</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">{funnel.pages}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-xl text-center">
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider mb-1">Leads</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">{funnel.leads}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-xl text-center">
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider mb-1">Conv.</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">{funnel.conversion}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsCreating(true)}
                    className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Edit3 className="w-4 h-4" />
                    Editar
                  </button>
                  <button className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-500" title="Visualizar">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-500" title="Duplicar">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="templates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {templates.map((template) => (
              <motion.button
                key={template.id}
                onClick={() => setIsCreating(true)}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-xl transition-all text-left flex flex-col h-full group"
              >
                <div className={cn("w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", template.color)}>
                  <template.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{template.name}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex-1">{template.description}</p>
                <div className="text-xs font-bold text-orange-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Usar Template <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
