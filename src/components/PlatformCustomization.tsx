import React, { useState } from 'react';
import { 
  Palette, Type, Image, Phone, Mail, MapPin, 
  Facebook, Twitter, Instagram, Linkedin, Save,
  Upload, AlignLeft, AlignCenter, AlignRight, Eye
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { PlatformPreview } from './PlatformPreview';

export function PlatformCustomization() {
  const { settings, updateSettings } = usePlatform();
  const { teachers } = useTeacher();
  const [activeSection, setActiveSection] = useState<'general' | 'colors' | 'contact' | 'content' | 'preview'>('general');
  const [tempSettings, setTempSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateSettings(tempSettings);
    setIsSaving(false);
  };

  const predefinedThemes = {
    modern: {
      primary: '#3B82F6',
      text: '#1F2937',
      background: '#F8FAFC',
      accent: '#10B981'
    },
    classic: {
      primary: '#1E40AF',
      text: '#374151',
      background: '#FFFFFF',
      accent: '#DC2626'
    },
    minimal: {
      primary: '#6B7280',
      text: '#111827',
      background: '#FAFAFA',
      accent: '#F59E0B'
    },
    vibrant: {
      primary: '#EC4899',
      text: '#1F2937',
      background: '#FEF7FF',
      accent: '#8B5CF6'
    }
  };

  const applyTheme = (theme: keyof typeof predefinedThemes) => {
    setTempSettings(prev => ({
      ...prev,
      theme,
      colors: predefinedThemes[theme]
    }));
  };

  const sections = [
    { id: 'general', label: 'General', icon: Type },
    { id: 'colors', label: 'Colors & Theme', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'content', label: 'Content', icon: Type },
    { id: 'preview', label: 'Preview', icon: Eye }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
        <div className="flex flex-wrap gap-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                activeSection === section.id
                  ? 'bg-white text-blue-900 shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
        {activeSection === 'general' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">General Settings</h3>
            
            {/* Platform Name */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Platform Name
              </label>
              <input
                type="text"
                value={tempSettings.platformName}
                onChange={(e) => setTempSettings(prev => ({ ...prev, platformName: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter platform name"
              />
            </div>

            {/* Logo Settings */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Logo URL
              </label>
              <div className="flex space-x-3">
                <input
                  type="url"
                  value={tempSettings.logo.url}
                  onChange={(e) => setTempSettings(prev => ({ 
                    ...prev, 
                    logo: { ...prev.logo, url: e.target.value }
                  }))}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://example.com/logo.png"
                />
                <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-3 rounded-xl transition-all duration-200 border border-blue-500/30">
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Logo Position */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Logo Position
              </label>
              <div className="flex space-x-2">
                {[
                  { value: 'left', icon: AlignLeft, label: 'Left' },
                  { value: 'center', icon: AlignCenter, label: 'Center' },
                  { value: 'right', icon: AlignRight, label: 'Right' }
                ].map((position) => (
                  <button
                    key={position.value}
                    onClick={() => setTempSettings(prev => ({ 
                      ...prev, 
                      logo: { ...prev.logo, position: position.value as any }
                    }))}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                      tempSettings.logo.position === position.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    <position.icon className="w-4 h-4" />
                    <span className="text-sm">{position.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'colors' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Colors & Theme</h3>
            
            {/* Predefined Themes */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-3">
                Quick Themes
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(predefinedThemes).map(([themeName, colors]) => (
                  <button
                    key={themeName}
                    onClick={() => applyTheme(themeName as any)}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      tempSettings.theme === themeName
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex space-x-1 mb-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.primary }}></div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.accent }}></div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.background }}></div>
                    </div>
                    <p className="text-white text-xs font-medium capitalize">{themeName}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'primary', label: 'Primary Color', description: 'Main brand color' },
                { key: 'accent', label: 'Accent Color', description: 'Secondary highlights' },
                { key: 'text', label: 'Text Color', description: 'Main text color' },
                { key: 'background', label: 'Background Color', description: 'Page background' }
              ].map((color) => (
                <div key={color.key}>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    {color.label}
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={tempSettings.colors[color.key as keyof typeof tempSettings.colors]}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        colors: { ...prev.colors, [color.key]: e.target.value }
                      }))}
                      className="w-12 h-12 rounded-lg border border-white/20 bg-white/5 cursor-pointer"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">{color.label}</p>
                      <p className="text-blue-300 text-xs">{color.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'typography' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Typography Settings</h3>
            
            {/* Font Family */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Font Family
              </label>
              <select
                value={tempSettings.typography.fontFamily}
                onChange={(e) => setTempSettings(prev => ({
                  ...prev,
                  typography: { ...prev.typography, fontFamily: e.target.value }
                }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="Inter, system-ui, sans-serif" className="bg-gray-800">Inter (Modern)</option>
                <option value="Georgia, serif" className="bg-gray-800">Georgia (Classic)</option>
                <option value="Arial, sans-serif" className="bg-gray-800">Arial (Clean)</option>
                <option value="Roboto, sans-serif" className="bg-gray-800">Roboto (Google)</option>
                <option value="Poppins, sans-serif" className="bg-gray-800">Poppins (Friendly)</option>
                <option value="Playfair Display, serif" className="bg-gray-800">Playfair (Elegant)</option>
              </select>
            </div>

            {/* Typography Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Heading Size */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-3">
                  Heading Size
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'small', label: 'Small', size: 'text-lg' },
                    { value: 'medium', label: 'Medium', size: 'text-xl' },
                    { value: 'large', label: 'Large', size: 'text-2xl' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTempSettings(prev => ({
                        ...prev,
                        typography: { ...prev.typography, headingSize: option.value as any }
                      }))}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        tempSettings.typography.headingSize === option.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-blue-300 hover:bg-white/10'
                      }`}
                    >
                      <span className={`${option.size} font-bold`}>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Size */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-3">
                  Body Text Size
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'small', label: 'Small', size: 'text-sm' },
                    { value: 'medium', label: 'Medium', size: 'text-base' },
                    { value: 'large', label: 'Large', size: 'text-lg' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTempSettings(prev => ({
                        ...prev,
                        typography: { ...prev.typography, bodySize: option.value as any }
                      }))}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        tempSettings.typography.bodySize === option.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-blue-300 hover:bg-white/10'
                      }`}
                    >
                      <span className={option.size}>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-3">
                  Line Height
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'tight', label: 'Tight', class: 'leading-tight' },
                    { value: 'normal', label: 'Normal', class: 'leading-normal' },
                    { value: 'relaxed', label: 'Relaxed', class: 'leading-relaxed' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTempSettings(prev => ({
                        ...prev,
                        typography: { ...prev.typography, lineHeight: option.value as any }
                      }))}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        tempSettings.typography.lineHeight === option.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-blue-300 hover:bg-white/10'
                      }`}
                    >
                      <span className={option.class}>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Weight */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-3">
                  Font Weight
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'light', label: 'Light', class: 'font-light' },
                    { value: 'normal', label: 'Normal', class: 'font-normal' },
                    { value: 'medium', label: 'Medium', class: 'font-medium' },
                    { value: 'bold', label: 'Bold', class: 'font-bold' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTempSettings(prev => ({
                        ...prev,
                        typography: { ...prev.typography, fontWeight: option.value as any }
                      }))}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        tempSettings.typography.fontWeight === option.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-blue-300 hover:bg-white/10'
                      }`}
                    >
                      <span className={option.class}>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type="tel"
                    value={tempSettings.contactInfo.phone}
                    onChange={(e) => setTempSettings(prev => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, phone: e.target.value }
                    }))}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type="email"
                    value={tempSettings.contactInfo.email}
                    onChange={(e) => setTempSettings(prev => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, email: e.target.value }
                    }))}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="info@platform.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-blue-300" />
                <textarea
                  value={tempSettings.contactInfo.address}
                  onChange={(e) => setTempSettings(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, address: e.target.value }
                  }))}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  rows={3}
                  placeholder="123 Education Street, Learning City, LC 12345"
                />
              </div>
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-3">
                Social Media Links
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/yourpage' },
                  { key: 'twitter', label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/yourhandle' },
                  { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/yourprofile' },
                  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/company/yourcompany' }
                ].map((social) => (
                  <div key={social.key}>
                    <div className="relative">
                      <social.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                      <input
                        type="url"
                        value={tempSettings.contactInfo.socialLinks[social.key as keyof typeof tempSettings.contactInfo.socialLinks] || ''}
                        onChange={(e) => setTempSettings(prev => ({
                          ...prev,
                          contactInfo: {
                            ...prev.contactInfo,
                            socialLinks: {
                              ...prev.contactInfo.socialLinks,
                              [social.key]: e.target.value
                            }
                          }
                        }))}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                        placeholder={social.placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'content' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Content Settings</h3>
            
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Platform Description
              </label>
              <textarea
                value={tempSettings.content.description}
                onChange={(e) => setTempSettings(prev => ({
                  ...prev,
                  content: { ...prev.content, description: e.target.value }
                }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                rows={3}
                placeholder="Brief description of your educational platform"
              />
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Welcome Message
              </label>
              <textarea
                value={tempSettings.content.welcomeMessage}
                onChange={(e) => setTempSettings(prev => ({
                  ...prev,
                  content: { ...prev.content, welcomeMessage: e.target.value }
                }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                rows={3}
                placeholder="Welcome message for visitors"
              />
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Footer Text
              </label>
              <input
                type="text"
                value={tempSettings.content.footerText}
                onChange={(e) => setTempSettings(prev => ({
                  ...prev,
                  content: { ...prev.content, footerText: e.target.value }
                }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Footer copyright or tagline"
              />
            </div>
          </div>
        )}

        {activeSection === 'colors' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Colors & Theme</h3>
            
            {/* Theme Selector */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-3">
                Choose Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(predefinedThemes).map(([themeName, colors]) => (
                  <button
                    key={themeName}
                    onClick={() => applyTheme(themeName as any)}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      tempSettings.theme === themeName
                        ? 'border-white bg-white/10 ring-2 ring-blue-500'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex justify-center space-x-1 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.background }}></div>
                    </div>
                    <p className="text-white text-xs font-medium capitalize">{themeName}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { key: 'primary', label: 'Primary Color', description: 'Main brand color for buttons and highlights' },
                { key: 'accent', label: 'Accent Color', description: 'Secondary color for accents and CTAs' },
                { key: 'text', label: 'Text Color', description: 'Main text and content color' },
                { key: 'background', label: 'Background Color', description: 'Page and section backgrounds' }
              ].map((color) => (
                <div key={color.key} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="color"
                      value={tempSettings.colors[color.key as keyof typeof tempSettings.colors]}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        colors: { ...prev.colors, [color.key]: e.target.value }
                      }))}
                      className="w-10 h-10 rounded-lg border border-white/20 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{color.label}</p>
                      <p className="text-blue-300 text-xs">{color.description}</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={tempSettings.colors[color.key as keyof typeof tempSettings.colors]}
                    onChange={(e) => setTempSettings(prev => ({
                      ...prev,
                      colors: { ...prev.colors, [color.key]: e.target.value }
                    }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="#000000"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'preview' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Platform Preview</h3>
            <PlatformPreview settings={tempSettings} />
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-emerald-600 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}