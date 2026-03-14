import React, { useState } from 'react';
import { 
  Plus, 
  MessageSquare, 
  Settings2, 
  Play, 
  Trash2, 
  ChevronRight, 
  ChevronDown,
  Zap,
  User,
  Bot,
  ArrowDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const initialFlow = [
  { 
    id: '1', 
    type: 'trigger', 
    label: 'Mensagem de Boas-vindas', 
    content: 'Olá! Sou o assistente virtual da Bot.AI Vendas. Como posso te ajudar hoje?',
    next: ['2', '3']
  },
  { 
    id: '2', 
    type: 'option', 
    label: 'Opção: Conhecer Produto', 
    content: 'Quero conhecer o produto',
    next: ['4']
  },
  { 
    id: '3', 
    type: 'option', 
    label: 'Opção: Falar com Suporte', 
    content: 'Preciso de suporte técnico',
    next: ['5']
  },
  { 
    id: '4', 
    type: 'message', 
    label: 'Apresentação do Produto', 
    content: 'Nosso produto é a solução ideal para automação de vendas...',
    next: []
  },
  { 
    id: '5', 
    type: 'message', 
    label: 'Encaminhamento Suporte', 
    content: 'Um de nossos especialistas entrará em contato em breve.',
    next: []
  }
];

export function Chatbot() {
  const [flow, setFlow] = useState(initialFlow);
  const [activeNode, setActiveNode] = useState<string | null>('1');

  const handleUpdateNode = (id: string, field: 'label' | 'content', value: string) => {
    setFlow(prev => prev.map(node => 
      node.id === id ? { ...node, [field]: value } : node
    ));
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Chatbot de Atendimento</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Configure o fluxo de conversas automáticas para seus leads.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
            <Play className="w-4 h-4" />
            Testar Fluxo
          </button>
          <button className="bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20">
            <Plus className="w-5 h-5" />
            Novo Bloco
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Flow Visualization */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm min-h-[600px] relative overflow-auto">
          <div className="flex flex-col items-center space-y-12">
            {/* Root Node */}
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveNode('1')}
                className={cn(
                  "w-64 p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-lg",
                  activeNode === '1' ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10" : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Gatilho Inicial</span>
                </div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{flow.find(n => n.id === '1')?.label}</p>
              </motion.div>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-px h-12 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Level 2 */}
            <div className="flex gap-8 relative">
              <div className="absolute -top-12 left-1/4 right-1/4 h-px bg-zinc-200 dark:bg-zinc-800" />
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveNode('2')}
                className={cn(
                  "w-64 p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-md",
                  activeNode === '2' ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Opção do Usuário</span>
                </div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{flow.find(n => n.id === '2')?.label.replace('Opção: ', '')}</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveNode('3')}
                className={cn(
                  "w-64 p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-md",
                  activeNode === '3' ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Opção do Usuário</span>
                </div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{flow.find(n => n.id === '3')?.label.replace('Opção: ', '')}</p>
              </motion.div>
            </div>

            {/* Level 3 */}
            <div className="flex gap-8">
              <div className="w-64 flex flex-col items-center">
                <ArrowDown className="w-6 h-6 text-zinc-300 dark:text-zinc-700 mb-4" />
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveNode('4')}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-md",
                    activeNode === '4' ? "border-purple-500 bg-purple-50 dark:bg-purple-500/10" : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Resposta Bot</span>
                  </div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{flow.find(n => n.id === '4')?.label}</p>
                </motion.div>
              </div>

              <div className="w-64 flex flex-col items-center">
                <ArrowDown className="w-6 h-6 text-zinc-300 dark:text-zinc-700 mb-4" />
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveNode('5')}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-md",
                    activeNode === '5' ? "border-purple-500 bg-purple-50 dark:bg-purple-500/10" : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Resposta Bot</span>
                  </div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{flow.find(n => n.id === '5')?.label}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Node Editor */}
        <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm h-fit sticky top-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
              <Settings2 className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Editor do Bloco</h2>
          </div>

          {activeNode ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Título do Bloco</label>
                <input 
                  type="text" 
                  value={flow.find(n => n.id === activeNode)?.label || ''}
                  onChange={(e) => handleUpdateNode(activeNode, 'label', e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Conteúdo da Mensagem</label>
                <textarea 
                  rows={6}
                  value={flow.find(n => n.id === activeNode)?.content || ''}
                  onChange={(e) => handleUpdateNode(activeNode, 'content', e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button className="flex-1 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold py-2.5 rounded-xl text-sm transition-all">
                  Salvar Alterações
                </button>
                <button className="p-2.5 border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-zinc-200 dark:text-zinc-800 mx-auto mb-4" />
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Selecione um bloco para editar suas configurações.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
