import React from 'react';
import { 
  Facebook, Twitter, Instagram, Linkedin, 
  Phone, Mail, MapPin, Star, Users, BookOpen 
} from 'lucide-react';
import { PlatformSettings } from '../types/PlatformSettings';

interface PlatformPreviewProps {
  settings: PlatformSettings;
}

export function PlatformPreview({ settings }: PlatformPreviewProps) {
  const { platformName, logo, colors, contactInfo, content } = settings;

  const logoAlignment = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
      {/* Header */}
      <header 
        className="px-6 py-4 border-b"
        style={{ backgroundColor: colors.background, borderColor: colors.primary + '20' }}
      >
        <div className={`flex items-center ${logoAlignment[logo.position]}`}>
          <div className="flex items-center space-x-3">
            <img 
              src={logo.url} 
              alt="Logo" 
              className="w-10 h-10 rounded-lg object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop';
              }}
            />
            <h1 
              className="text-xl font-bold"
              style={{ color: colors.text }}
            >
              {platformName}
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-8" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            {content.welcomeMessage}
          </h2>
          <p 
            className="text-lg mb-6 opacity-80"
            style={{ color: colors.text }}
          >
            {content.description}
          </p>
          <button 
            className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.primary }}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-8 border-t" style={{ backgroundColor: colors.background, borderColor: colors.primary + '20' }}>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: Users, title: 'Expert Teachers', desc: 'Qualified educators' },
            { icon: BookOpen, title: 'Rich Content', desc: 'Comprehensive curriculum' },
            { icon: Star, title: 'Quality Learning', desc: 'Proven results' }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: colors.accent + '20' }}
              >
                <feature.icon className="w-6 h-6" style={{ color: colors.accent }} />
              </div>
              <h3 className="font-semibold mb-1" style={{ color: colors.text }}>
                {feature.title}
              </h3>
              <p className="text-sm opacity-70" style={{ color: colors.text }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="px-6 py-6 border-t"
        style={{ backgroundColor: colors.primary + '10', borderColor: colors.primary + '20' }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div>
            <p className="font-medium mb-2" style={{ color: colors.text }}>
              {content.footerText}
            </p>
            <div className="space-y-1 text-sm opacity-80" style={{ color: colors.text }}>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {Object.entries(contactInfo.socialLinks).map(([platform, url]) => {
              if (!url) return null;
              const Icon = socialIcons[platform as keyof typeof socialIcons];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: colors.accent + '20' }}
                >
                  <Icon className="w-4 h-4" style={{ color: colors.accent }} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}