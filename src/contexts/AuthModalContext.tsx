'use client';

import React, { createContext, useContext, useState } from 'react';

interface AuthModalContextType {
  isOpen: boolean;
  view: 'login' | 'register';
  openModal: (view?: 'login' | 'register') => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'login' | 'register'>('login');

  const openModal = (initialView: 'login' | 'register' = 'login') => {
    setView(initialView);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ isOpen, view, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}
