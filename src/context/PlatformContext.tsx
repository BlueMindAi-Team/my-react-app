import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlatformSettings } from '../types/PlatformSettings';

interface PlatformContextType {
  settings: PlatformSettings;
  updateSettings: (settings: Partial<PlatformSettings>) => void;
}

const defaultSettings: PlatformSettings = {
  id: '1',
  platformName: 'EduPlatform',
  logo: {
    url: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    position: 'left'
  },
  colors: {
    primary: '#3B82F6',
    text: '#1F2937',
    background: '#F8FAFC',
    accent: '#10B981'
  },
  contactInfo: {
    phone: '+1 (555) 123-4567',
    email: 'info@eduplatform.com',
    address: '123 Education Street, Learning City, LC 12345',
    socialLinks: {
      facebook: 'https://facebook.com/eduplatform',
      twitter: 'https://twitter.com/eduplatform',
      instagram: 'https://instagram.com/eduplatform'
    }
  },
  content: {
    description: 'Empowering education through innovative digital learning solutions',
    welcomeMessage: 'Welcome to our educational platform where learning meets innovation',
    footerText: 'Transforming education for the digital age'
  },
  theme: 'modern',
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    headingSize: 'medium',
    bodySize: 'medium',
    lineHeight: 'normal',
    fontWeight: 'normal'
  }
};

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PlatformSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <PlatformContext.Provider value={{ settings, updateSettings }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}