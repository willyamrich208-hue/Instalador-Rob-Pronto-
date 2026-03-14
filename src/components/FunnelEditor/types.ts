import { Node, Edge } from '@xyflow/react';

export type FunnelNodeType = 
  | 'capture' 
  | 'sales' 
  | 'checkout' 
  | 'chatbot' 
  | 'messages' 
  | 'note' 
  | 'strategy'
  | 'mindmap';

export interface FunnelNodeData extends Record<string, unknown> {
  label: string;
  type: FunnelNodeType;
  content?: string;
  icon?: string;
}

export type FunnelNode = Node<FunnelNodeData>;
export type FunnelEdge = Edge;

export interface FunnelTemplate {
  id: string;
  name: string;
  description: string;
  nodes: FunnelNode[];
  edges: FunnelEdge[];
}
