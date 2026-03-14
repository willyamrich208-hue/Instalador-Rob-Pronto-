export interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  date: string;
  source: string;
}

export interface Funnel {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  steps: string[];
}

export interface ProductPage {
  id: string;
  name: string;
  promise: string;
  audience: string;
  price: number;
  benefits: string[];
  method: string;
  checkoutLink: string;
  image: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'conversation' | 'activity';
  time: string;
  read: boolean;
}

export interface NotificationSettings {
  sales: boolean;
  leads: boolean;
  funnel: boolean;
  conversations: boolean;
  sound: boolean;
  animations: boolean;
  demoMode: boolean;
  volume: number;
  silentMode: boolean;
}

export type Theme = 'light' | 'dark';

