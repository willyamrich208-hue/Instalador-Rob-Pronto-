import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Eye, 
  Trash2, 
  Copy, 
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface PageData {
  name: string;
  promise: string;
  audience: string;
  price: string;
  benefits: string;
  method: string;
  checkoutLink: string;
}

export function Pages() {
  const [isCreating, setIsCreating] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [formData, setFormData] = useState<PageData>({
    name: '',
    promise: '',
    audience: '',
    price: '',
    benefits: '',
    method: '',
    checkoutLink: ''
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreviewing(true);
  };

  const benefitsList = formData.benefits.split('\n').filter(b => b.trim() !== '');

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Gerador de Páginas</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Crie landing pages de alta conversão em segundos.</p>
        </div>
        {!isPreviewing && (
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-5 h-5" />
            Nova Página
          </button>
        )}
        {isPreviewing && (
          <button 
            onClick={() => setIsPreviewing(false)}
            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            Voltar ao Editor
          </button>
        )}
      </header>

      <AnimatePresence mode="wait">
        {isPreviewing ? (
          <motion.div 
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white text-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200"
          >
            {/* Landing Page Preview */}
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold mb-8"
              >
                <Zap className="w-4 h-4" />
                Método Exclusivo: {formData.name}
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1]">
                {formData.promise || 'Sua promessa principal impactante aqui'}
              </h1>
              <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto">
                Descubra como o {formData.name || 'seu produto'} ajuda {formData.audience || 'seu público'} a alcançar resultados extraordinários através do {formData.method || 'seu método'}.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-400 text-white font-black text-lg py-5 px-10 rounded-2xl shadow-xl shadow-orange-500/20 transition-all hover:scale-105 active:scale-95">
                  QUERO ACESSO AGORA
                </button>
                <button className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold py-5 px-10 rounded-2xl transition-all">
                  SAIBA MAIS
                </button>
              </div>
            </div>

            <div className="bg-zinc-50 py-24 px-6">
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">O que você vai aprender:</h2>
                  <div className="space-y-4">
                    {(benefitsList.length > 0 ? benefitsList : ['Benefício 1', 'Benefício 2', 'Benefício 3']).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0" />
                        <p className="text-zinc-700 font-medium">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-zinc-200">
                  <div className="flex items-center gap-1 text-orange-400 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-zinc-600 italic mb-6">
                    "Este método mudou completamente a forma como eu vejo o mercado. Os resultados vieram muito mais rápido do que eu esperava!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-200 rounded-full" />
                    <div>
                      <p className="font-bold">Ana Oliveira</p>
                      <p className="text-sm text-zinc-500">Aluna do {formData.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-24 px-6 text-center bg-zinc-900 text-white">
              <h2 className="text-4xl font-bold mb-4">Pronto para começar?</h2>
              <p className="text-zinc-400 mb-12">Junte-se a centenas de alunos que já estão transformando suas vidas.</p>
              <div className="inline-block bg-zinc-800 p-8 rounded-3xl border border-zinc-700 mb-12">
                <p className="text-zinc-400 line-through mb-1">De R$ {Number(formData.price || 0) * 2}</p>
                <p className="text-5xl font-black text-orange-400 mb-2">R$ {formData.price || '0,00'}</p>
                <p className="text-sm text-zinc-500">Pagamento único e seguro</p>
              </div>
              <br />
              <button className="bg-orange-500 hover:bg-orange-400 text-white font-black text-xl py-6 px-12 rounded-2xl shadow-2xl shadow-orange-500/40 transition-all hover:scale-105 active:scale-95">
                GARANTIR MINHA VAGA
              </button>
            </div>
          </motion.div>
        ) : isCreating ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Configurar Nova Página</h2>
              <button 
                onClick={() => setIsCreating(false)}
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-sm font-medium"
              >
                Cancelar
              </button>
            </div>

            <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Nome do Produto</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  placeholder="Ex: Método Venda Rápida"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Preço (R$)</label>
                <input 
                  type="text" 
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  placeholder="Ex: 97,00"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Promessa Principal (Headline)</label>
                <input 
                  type="text" 
                  value={formData.promise}
                  onChange={e => setFormData({...formData, promise: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  placeholder="Ex: Como faturar seus primeiros R$ 10 mil em 30 dias"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Público Alvo</label>
                <input 
                  type="text" 
                  value={formData.audience}
                  onChange={e => setFormData({...formData, audience: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  placeholder="Ex: Iniciantes no marketing digital"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Link de Checkout</label>
                <input 
                  type="url" 
                  value={formData.checkoutLink}
                  onChange={e => setFormData({...formData, checkoutLink: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  placeholder="https://pay.hotmart.com/..."
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Benefícios (um por linha)</label>
                <textarea 
                  rows={4}
                  value={formData.benefits}
                  onChange={e => setFormData({...formData, benefits: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none"
                  placeholder="Acesso vitalício&#10;Suporte 24h&#10;Bônus exclusivo"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Descrição do Método</label>
                <textarea 
                  rows={3}
                  value={formData.method}
                  onChange={e => setFormData({...formData, method: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none"
                  placeholder="Explique brevemente como seu método funciona..."
                  required
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
                >
                  Gerar e Visualizar Página
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm group"
              >
                <div className="aspect-video bg-zinc-100 dark:bg-zinc-900 relative flex items-center justify-center">
                  <FileText className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="bg-white text-zinc-900 p-2 rounded-lg hover:bg-zinc-100 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="bg-white text-zinc-900 p-2 rounded-lg hover:bg-zinc-100 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1">Página de Vendas {i}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Criada em 14 de Março, 2026</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="text-orange-500 text-sm font-bold hover:text-orange-400 transition-colors">
                      Editar Página
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
