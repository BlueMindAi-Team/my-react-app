import React, { useState } from 'react';
import { Plus, User, BookOpen, Globe, Mail, Key, Copy, Check } from 'lucide-react';
import { useTeacher } from '../context/TeacherContext';
import { generateRandomEmail, generateRandomPassword, generateDomain } from '../utils/generators';

export function AddTeacherForm() {
  const { addTeacher } = useTeacher();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    domain: ''
  });
  const [generatedData, setGeneratedData] = useState<{
    email: string;
    password: string;
    websiteUrl: string;
    parentUrl: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.subject || !formData.domain) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const email = generateRandomEmail(formData.name);
    const password = generateRandomPassword();
    const domain = generateDomain(formData.domain);
    const websiteUrl = `https://${domain}.edu-platform.com`;
    const parentUrl = `https://${domain}.edu-platform.com/parent-portal`;

    const newTeacher = {
      id: Date.now().toString(),
      name: formData.name,
      subject: formData.subject,
      domain: formData.domain,
      email,
      password,
      websiteUrl,
      parentUrl,
      registrationDate: new Date().toISOString(),
      subscriptionExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active' as const,
      useCustomTypography: false
    };

    addTeacher(newTeacher);
    setGeneratedData({
      email,
      password,
      websiteUrl,
      parentUrl
    });
    setFormData({ name: '', subject: '', domain: '' });
    setIsSubmitting(false);
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const resetForm = () => {
    setGeneratedData(null);
    setFormData({ name: '', subject: '', domain: '' });
  };

  if (generatedData) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Teacher Added Successfully!</h2>
            <p className="text-blue-200">Generated credentials and website links</p>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Email', value: generatedData.email, icon: Mail },
              { label: 'Password', value: generatedData.password, icon: Key },
              { label: 'Teacher Website', value: generatedData.websiteUrl, icon: Globe },
              { label: 'Parent Portal', value: generatedData.parentUrl, icon: User }
            ].map((item, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <item.icon className="w-5 h-5 text-blue-300" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-blue-200">{item.label}</p>
                      <p className="text-white font-medium break-all text-xs sm:text-sm">{item.value}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.value, item.label)}
                    className="ml-2 sm:ml-4 p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-200 group flex-shrink-0 touch-manipulation"
                  >
                    {copiedField === item.label ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-blue-300 group-hover:text-white" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={resetForm}
            className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 sm:py-4 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base touch-manipulation"
          >
            Add Another Teacher
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Add New Teacher</h2>
          <p className="text-sm sm:text-base text-blue-200">Create a new teacher account with website and parent portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Teacher Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter teacher's full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Subject
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Domain Name
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') })}
                  className="w-full pl-12 pr-4 py-3 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="teacher-domain-name"
                  required
                />
              </div>
              <p className="text-blue-300 text-xs mt-2">
                Will be hosted on: <span className="break-all">{formData.domain ? `${formData.domain}.edu-platform.com` : 'your-domain.edu-platform.com'}</span>
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.subject || !formData.domain}
            className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 sm:py-4 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none text-sm sm:text-base"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span className="text-sm sm:text-base">Creating Teacher Account...</span>
              </div>
            ) : (
              'Create Teacher Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}