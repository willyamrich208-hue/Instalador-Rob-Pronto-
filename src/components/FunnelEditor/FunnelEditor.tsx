import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  Panel,
  BackgroundVariant,
  ConnectionMode,
  OnConnect,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { FunnelNodeComponent, NoteNodeComponent, MindMapNodeComponent } from './nodes/CustomNodes';
import { Toolbar, TopBar } from './Toolbar';
import { DrawingLayer } from './DrawingLayer';
import { FunnelNodeType, FunnelNode } from './types';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

const nodeTypes = {
  capture: FunnelNodeComponent,
  sales: FunnelNodeComponent,
  checkout: FunnelNodeComponent,
  chatbot: FunnelNodeComponent,
  messages: FunnelNodeComponent,
  note: NoteNodeComponent,
  strategy: FunnelNodeComponent,
  mindmap: MindMapNodeComponent,
};

const initialNodes: FunnelNode[] = [
  {
    id: '1',
    type: 'capture',
    position: { x: 250, y: 100 },
    data: { label: 'Página de Captura Principal', type: 'capture' },
  },
  {
    id: '2',
    type: 'chatbot',
    position: { x: 250, y: 250 },
    data: { label: 'Qualificação Automática', type: 'chatbot', content: 'Inicia após o cadastro' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
];

interface FunnelEditorProps {
  onBack: () => void;
}

export type EditorTool = 'select' | 'move' | 'pencil' | 'eraser' | 'connect' | 'delete';

function FunnelEditorContent({ onBack }: FunnelEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<FunnelNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [funnelName, setFunnelName] = useState('Novo Funil Estratégico');
  const [theme, setTheme] = useState('dark');
  const [activeTool, setActiveTool] = useState<EditorTool>('select');
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#f97316', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const onAddNode = useCallback((type: FunnelNodeType, position?: { x: number, y: number }) => {
    const id = `${Date.now()}`;
    const newNode: FunnelNode = {
      id,
      type,
      position: position || { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Novo ${type}`, type },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as FunnelNodeType;

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      onAddNode(type, position);
    },
    [screenToFlowPosition, onAddNode]
  );

  const onDeleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
  }, [setNodes, setEdges]);

  const onSave = () => {
    console.log('Saving funnel:', { funnelName, nodes, edges });
    alert('Funil salvo com sucesso!');
  };

  const onPublish = () => {
    console.log('Publishing funnel:', { funnelName, nodes, edges });
    alert('Funil publicado com sucesso!');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTool('select');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isDrawingMode = activeTool === 'pencil' || activeTool === 'eraser';

  return (
    <div className={cn(
      "fixed inset-0 z-[60] flex flex-col transition-colors duration-500",
      theme === 'dark' ? "bg-zinc-950" : 
      theme === 'light' ? "bg-zinc-50" :
      theme === 'neon' ? "bg-black" : "bg-white",
      isDrawingMode && "cursor-pencil"
    )}>
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <DrawingLayer 
          isActive={isDrawingMode} 
          isEraser={activeTool === 'eraser'}
          color={theme === 'dark' ? '#f97316' : '#ea580c'} 
        />
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          minZoom={0.5}
          maxZoom={2}
          panOnDrag={activeTool === 'move'}
          selectionOnDrag={activeTool === 'select'}
          nodesDraggable={activeTool === 'select'}
          nodesConnectable={activeTool === 'connect' || activeTool === 'select'}
          elementsSelectable={activeTool === 'select'}
          className={cn(
            theme === 'neon' ? "neon-flow" : "",
            theme === 'minimal' ? "minimal-flow" : ""
          )}
        >
          <Background 
            variant={BackgroundVariant.Lines} 
            gap={40} 
            size={1} 
            color={theme === 'dark' ? '#18181b' : '#f4f4f5'} 
          />
          <Controls />
          
          <TopBar 
            onSave={onSave} 
            onPublish={onPublish} 
            onExit={onBack}
            funnelName={funnelName} 
            setFunnelName={setFunnelName} 
          />
          
          <Toolbar 
            onAddNode={onAddNode} 
            onDeleteSelected={onDeleteSelected}
            onSave={onSave}
            onPublish={onPublish}
            theme={theme}
            setTheme={setTheme}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />

          {isDrawingMode && (
            <Panel position="bottom-center" className="mb-8">
              <button 
                onClick={() => setActiveTool('select')}
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 hover:scale-105 transition-all active:scale-95 border-2 border-orange-500"
              >
                <X className="w-5 h-5" />
                Sair do modo desenho
              </button>
            </Panel>
          )}

          <Panel position="bottom-right" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 shadow-xl mb-4 mr-4">
            <button 
              onClick={onBack}
              className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Voltar para Biblioteca
            </button>
          </Panel>
        </ReactFlow>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .neon-flow .react-flow__edge-path {
          stroke: #f97316;
          filter: drop-shadow(0 0 8px #f97316);
          stroke-width: 3;
        }
        .neon-flow .react-flow__node {
          filter: drop-shadow(0 0 15px rgba(249, 115, 22, 0.3));
        }
        .minimal-flow .react-flow__handle {
          background: #71717a !important;
          border: none !important;
        }
        .minimal-flow .react-flow__edge-path {
          stroke: #d4d4d8;
          stroke-width: 1;
        }
        .cursor-pencil {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'/%3E%3Cpath d='m15 5 4 4'/%3E%3C/svg%3E") 0 24, auto !important;
        }
      `}} />
    </div>
  );
}

export function FunnelEditor(props: FunnelEditorProps) {
  return (
    <ReactFlowProvider>
      <FunnelEditorContent {...props} />
    </ReactFlowProvider>
  );
}
