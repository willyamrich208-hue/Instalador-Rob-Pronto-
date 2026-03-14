import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { 
  Globe, 
  FileText, 
  CreditCard, 
  Bot, 
  Mail, 
  StickyNote, 
  Zap,
  MoreVertical,
  GitFork
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { FunnelNode } from '../types';
import { motion } from 'motion/react';

const nodeConfig = {
  capture: { icon: Globe, color: 'bg-blue-500', label: 'Página de Captura' },
  sales: { icon: FileText, color: 'bg-purple-500', label: 'Página de Vendas' },
  checkout: { icon: CreditCard, color: 'bg-orange-500', label: 'Checkout' },
  chatbot: { icon: Bot, color: 'bg-emerald-500', label: 'Chatbot' },
  messages: { icon: Mail, color: 'bg-indigo-500', label: 'Sequência' },
  note: { icon: StickyNote, color: 'bg-yellow-500', label: 'Anotação' },
  strategy: { icon: Zap, color: 'bg-pink-500', label: 'Estratégia' },
  mindmap: { icon: GitFork, color: 'bg-cyan-500', label: 'Ideia' },
};

export const FunnelNodeComponent = memo(({ data, selected }: NodeProps<FunnelNode>) => {
  const config = nodeConfig[data.type as keyof typeof nodeConfig];
  const Icon = config?.icon || StickyNote;

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "group relative min-w-[180px] bg-white dark:bg-zinc-900 border-2 rounded-2xl p-4 shadow-lg transition-all",
        selected ? "border-orange-500 ring-4 ring-orange-500/10" : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
      )}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-orange-500 border-2 border-white dark:border-zinc-900" />
      
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md", config?.color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">
            {config?.label}
          </p>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
            {data.label}
          </h3>
        </div>
        <button className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {data.content && (
        <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 italic">
            "{data.content}"
          </p>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-orange-500 border-2 border-white dark:border-zinc-900" />
    </motion.div>
  );
});

export const MindMapNodeComponent = memo(({ data, selected }: NodeProps<FunnelNode>) => {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "w-24 h-24 rounded-full bg-cyan-50 dark:bg-cyan-900/20 border-2 border-cyan-200 dark:border-cyan-900/50 flex flex-col items-center justify-center p-2 text-center shadow-md transition-all",
        selected ? "ring-4 ring-cyan-500/20 border-cyan-400 scale-105" : "hover:border-cyan-300"
      )}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-cyan-500" />
      <GitFork className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mb-1" />
      <span className="text-[9px] font-bold text-zinc-700 dark:text-zinc-300 leading-tight">
        {data.label}
      </span>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-cyan-500" />
    </motion.div>
  );
});

export const NoteNodeComponent = memo(({ data, selected }: NodeProps<FunnelNode>) => {
  return (
    <motion.div 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "min-w-[200px] bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-900/50 rounded-xl p-4 shadow-md rotate-[-1deg]",
        selected ? "ring-4 ring-yellow-500/20 border-yellow-400" : ""
      )}
    >
      <div className="flex items-center gap-2 mb-2 text-yellow-700 dark:text-yellow-400">
        <StickyNote className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Anotação</span>
      </div>
      <textarea 
        className="w-full bg-transparent border-none p-0 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-yellow-600/50 focus:ring-0 resize-none min-h-[80px]"
        placeholder="Escreva sua ideia aqui..."
        defaultValue={data.content}
      />
    </motion.div>
  );
});
