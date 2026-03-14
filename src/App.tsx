/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Funnels } from './pages/Funnels';
import { Pages } from './pages/Pages';
import { Chatbot } from './pages/Chatbot';
import { Leads } from './pages/Leads';
import { Settings } from './pages/Settings';

// Placeholder components for other pages
const Notifications = () => <div className="p-8"><h1 className="text-2xl font-bold">Notificações</h1><p className="text-zinc-500 mt-2">Em breve: Histórico completo de notificações.</p></div>;
const Help = () => <div className="p-8"><h1 className="text-2xl font-bold">Ajuda & Suporte</h1><p className="text-zinc-500 mt-2">Em breve: Documentação e suporte técnico.</p></div>;


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<Dashboard />} />
        <Route path="/funnels" element={<Funnels />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}


