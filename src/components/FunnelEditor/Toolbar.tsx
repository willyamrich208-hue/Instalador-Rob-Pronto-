import React from 'react';
import { 
  Globe, 
  FileText, 
  CreditCard, 
  Bot, 
  Mail, 
  StickyNote, 
  Zap,
  MousePointer,
  Trash2,
  Save,
  Share2,
  Download,
  Layers,
  Palette,
  Pencil,
  GitFork,
  Move,
  Eraser,
  Link2,
  ChevronRight,
  LogOut,
  MousePointer2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { FunnelNodeType } from './types';
import { EditorTool } from './FunnelEditor';

interface ToolbarProps {
  onAddNode: (type: FunnelNodeType) => void;
  onDeleteSelected: () => void;
  onSave: () => void;
  onPublish: () => void;
  theme: string;
  setTheme: (theme: string) => void;
  activeTool: EditorTool;
  setActiveTool: (tool: EditorTool) => void;
}

const nodeElements = [
  { type: 'capture', icon: Globe, label: 'Página de Captura', color: 'text-blue-500' },
  { type: 'sales', icon: FileText, label: 'Página de Vendas', color: 'text-purple-500' },
  { type: 'checkout', icon: CreditCard, label: 'Checkout', color: 'text-orange-500' },
  { type: 'chatbot', icon: Bot, label: 'Chatbot', color: 'text-emerald-500' },
  { type: 'messages', icon: Mail, label: 'Sequência', color: 'text-indigo-500' },
  { type: 'note', icon: StickyNote, label: 'Anotação', color: 'text-yellow-500' },
  { type: 'strategy', icon: Zap, label: 'Estratégia', color: 'text-pink-500' },
  { type: 'mindmap', icon: GitFork, label: 'Ideia / Mapa Mental', color: 'text-cyan-500' },
];

const themes = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'neon', label: 'Neon' },
  { id: 'minimal', label: 'Minimal' },
];

export function Toolbar({ onAddNode, onDeleteSelected, onSave, onPublish, theme, setTheme, activeTool, setActiveTool }: ToolbarProps) {
  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
      {/* Main Tools */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 shadow-2xl flex flex-col gap-1">
        <ToolButton 
          icon={MousePointer2} 
          label="Selecionar" 
          active={activeTool === 'select'} 
          onClick={() => setActiveTool('select')} 
        />
        <ToolButton 
          icon={Move} 
          label="Mover Quadro" 
          active={activeTool === 'move'} 
          onClick={() => setActiveTool('move')} 
        />
        <ToolButton 
          icon={Pencil} 
          label="Lápis" 
          active={activeTool === 'pencil'} 
          onClick={() => setActiveTool('pencil')} 
        />
        <ToolButton 
          icon={Eraser} 
          label="Borracha" 
          active={activeTool === 'eraser'} 
          onClick={() => setActiveTool('eraser')} 
        />
        <ToolButton 
          icon={Link2} 
          label="Conectar Blocos" 
          active={activeTool === 'connect'} 
          onClick={() => setActiveTool('connect')} 
        />
        <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 my-1" />
        <ToolButton 
          icon={Trash2} 
          label="Excluir Elemento" 
          active={activeTool === 'delete'} 
          onClick={() => {
            onDeleteSelected();
            setActiveTool('select');
          }}
          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
        />
      </div>

      {/* Elements Menu */}
      <div className="relative group">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 shadow-2xl flex items-center justify-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
          <Layers className="w-6 h-6 text-orange-500" />
          <div className="absolute left-full ml-4 top-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto transition-all flex flex-col gap-2 min-w-[200px] origin-left">
            <div className="px-2 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 mb-1">
              Adicionar Elementos
            </div>
            <div className="grid grid-cols-1 gap-1">
              {nodeElements.map((tool) => (
                <button
                  key={tool.type}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData('application/reactflow', tool.type);
                    event.dataTransfer.effectAllowed = 'move';
                  }}
                  onClick={() => {
                    onAddNode(tool.type as FunnelNodeType);
                    setActiveTool('select');
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-left group/item cursor-grab active:cursor-grabbing"
                >
                  <div className={cn("w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover/item:scale-110 transition-transform", tool.color)}>
                    <tool.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {tool.label}
                  </span>
                  <ChevronRight className="w-3 h-3 ml-auto text-zinc-300 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 shadow-2xl flex flex-col gap-2">
        <div className="relative group/theme">
          <button className="p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-all flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </button>
          <div className="absolute left-full ml-4 top-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 shadow-2xl opacity-0 scale-95 group-hover/theme:opacity-100 group-hover/theme:scale-100 pointer-events-none group-hover/theme:pointer-events-auto transition-all flex flex-col gap-1 min-w-[120px] origin-left">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase text-left transition-all",
                  theme === t.id ? "bg-orange-500 text-white" : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolButton({ icon: Icon, label, active, onClick, className }: { icon: any, label: string, active: boolean, onClick: () => void, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative p-3 rounded-xl transition-all flex items-center justify-center",
        active 
          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-110 z-10" 
          : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
        className
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="absolute left-full ml-4 px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
        {label}
      </span>
    </button>
  );
}

export function TopBar({ onSave, onPublish, onExit, funnelName, setFunnelName }: { onSave: () => void, onPublish: () => void, onExit: () => void, funnelName: string, setFunnelName: (name: string) => void }) {
  return (
    <div className="absolute top-6 left-6 right-6 z-30 flex justify-between items-center pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-2 shadow-2xl flex items-center gap-3">
          <GitFork className="w-5 h-5 text-orange-500" />
          <input 
            type="text" 
            value={funnelName}
            onChange={(e) => setFunnelName(e.target.value)}
            className="bg-transparent border-none p-0 font-bold text-zinc-900 dark:text-white focus:ring-0 w-48"
            placeholder="Nome do Funil..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pointer-events-auto">
        <button 
          onClick={onSave}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-xl"
        >
          <Save className="w-4 h-4" />
          Salvar Rascunho
        </button>
        <button 
          onClick={onPublish}
          className="bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] shadow-2xl shadow-orange-500/20"
        >
          <Share2 className="w-4 h-4" />
          Publicar Funil
        </button>
        <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 mx-1" />
        <button 
          onClick={onExit}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-red-500 font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all shadow-xl"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  );
}
