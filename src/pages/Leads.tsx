import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Trash2, 
  MoreHorizontal, 
  Filter,
  Mail,
  MessageCircle,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

const initialLeads = [
  { id: '1', name: 'João Silva', email: 'joao.silva@email.com', whatsapp: '(11) 98765-4321', date: '14/03/2026 10:30', source: 'Página de Captura A' },
  { id: '2', name: 'Maria Oliveira', email: 'maria.o@gmail.com', whatsapp: '(21) 99999-8888', date: '14/03/2026 09:15', source: 'Chatbot Vendas' },
  { id: '3', name: 'Pedro Santos', email: 'pedro.santos@outlook.com', whatsapp: '(31) 97777-6666', date: '13/03/2026 22:45', source: 'Página de Captura B' },
  { id: '4', name: 'Ana Costa', email: 'ana.costa@empresa.com', whatsapp: '(41) 95555-4444', date: '13/03/2026 18:20', source: 'Chatbot Vendas' },
  { id: '5', name: 'Lucas Ferreira', email: 'lucas.f@bol.com.br', whatsapp: '(51) 93333-2222', date: '13/03/2026 14:10', source: 'Página de Captura A' },
  { id: '6', name: 'Carla Souza', email: 'carla.souza@uol.com.br', whatsapp: '(61) 91111-0000', date: '13/03/2026 08:55', source: 'Indicação Direta' },
];

export function Leads() {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Gerenciamento de Leads</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Visualize e gerencie todos os contatos capturados pelo sistema.</p>
        </div>
        <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98]">
          <Download className="w-5 h-5" />
          Exportar CSV
        </button>
      </header>

      <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 px-10 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <Calendar className="w-4 h-4" />
              Últimos 30 dias
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">WhatsApp</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Origem</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {filteredLeads.map((lead) => (
                <motion.tr 
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-sm">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">{lead.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <MessageCircle className="w-4 h-4 text-orange-500" />
                      {lead.whatsapp}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                    {lead.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-zinc-400 hover:text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
          <p className="text-sm text-zinc-500">Mostrando {filteredLeads.length} de {initialLeads.length} leads</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
}
