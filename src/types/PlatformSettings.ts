export interface PlatformSettings {
  id: string;
  platformName: string;
  logo: {
    url: string;
    position: 'left' | 'center' | 'right';
  };
  colors: {
    primary: string;
    text: string;
    background: string;
    accent: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    socialLinks: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  content: {
    description: string;
    welcomeMessage: string;
    footerText: string;
  };
  theme: 'modern' | 'classic' | 'minimal' | 'vibrant';
}