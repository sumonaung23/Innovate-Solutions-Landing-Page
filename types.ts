import type React from 'react';

export interface NavLink {
  href: string;
  label: string;
}

export interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
