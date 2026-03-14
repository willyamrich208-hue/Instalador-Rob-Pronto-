import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GitFork, 
  FileText, 
  MessageSquare, 
  Users, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: GitFork, label: 'Funis', path: '/funnels' },
  { icon: FileText, label: 'Páginas', path: '/pages' },
  { icon: MessageSquare, label: 'Chatbot', path: '/chatbot' },
  { icon: Users, label: 'Leads', path: '/leads' },
  { icon: Bell, label: 'Notificações', path: '/notifications' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

export function Sidebar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-64 h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col fixed left-0 top-0 z-50">
      <Link to="/" className="p-6 flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <img 
            src="https://i.pinimg.com/736x/54/77/a1/5477a1ebebe71d381043dd85ee2a0e65.jpg" 
            alt="Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
          Bot.AI <span className="text-orange-500">Vendas</span>
        </span>
      </Link>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400" 
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
        </button>
        <NavLink
          to="/help"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            isActive 
              ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400" 
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
          )}
        >
          <HelpCircle className="w-5 h-5" />
          Ajuda
        </NavLink>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
