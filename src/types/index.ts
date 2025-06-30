
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface Bot {
  id: string;
  name: string;
  description: string;
  avatar: string;
  color: string;
  gradient: string;
  category: string;
  capabilities: string[];
  responses: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  botId: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  botId: string;
  createdAt: Date;
  updatedAt: Date;
}
