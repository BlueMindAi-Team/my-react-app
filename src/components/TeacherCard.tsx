import React, { useState } from 'react';
import { 
  User, BookOpen, Globe, Mail, Key, Copy, Check, 
  Calendar, Clock, Trash2, AlertCircle, ExternalLink, Square, CheckSquare,
  Image, Upload, Type
} from 'lucide-react';
import { useTeacher } from '../context/TeacherContext';
import { Teacher } from '../types/Teacher';

interface TeacherCardProps {
  teacher: Teacher;
  showSelection?: boolean;
}

export function TeacherCard({ teacher, showSelection = false }: TeacherCardProps) {
  const { deleteTeacher, selectedTeachers, toggleTeacherSelection } = useTeacher();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [tempTypographyImage, setTempTypographyImage] = useState(teacher.typographyImage || '');
  const [tempCustomLogo, setTempCustomLogo] = useState(teacher.customLogo || '');

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDelete = () => {
    deleteTeacher(teacher.id);
    setShowDeleteConfirm(false);
  };

  const isExpired = new Date(teacher.subscriptionExpiry) < new Date();
  const daysUntilExpiry = Math.ceil((new Date(teacher.subscriptionExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isSelected = selectedTeachers.includes(teacher.id);

  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border transition-all duration-300 hover:bg-white/15 ${
      isSelected ? 'border-blue-400 bg-blue-500/10 ring-2 ring-blue-400/50' : 'border-white/20'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-3">
          {showSelection && (
            <button
              onClick={() => toggleTeacherSelection(teacher.id)}
              className="p-1 hover:bg-white/10 rounded transition-all duration-200"
            >
              {isSelected ? (
                <CheckSquare className="w-5 h-5 text-blue-400" />
              ) : (
                <Square className="w-5 h-5 text-white/60 hover:text-white" />
              )}
            </button>
          )}
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
            {teacher.customLogo ? (
              <img 
                src={teacher.customLogo} 
                alt={`${teacher.name} logo`}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <User className={`w-5 h-5 sm:w-6 sm:h-6 text-white ${teacher.customLogo ? 'hidden' : ''}`} />
          </div>
          <div className="min-w-0 flex-1">
            {teacher.useCustomTypography && teacher.typographyImage ? (
              <div className="mb-1">
                <img 
                  src={teacher.typographyImage} 
                  alt={`${teacher.name} typography`}
                  className="h-6 sm:h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <h3 className="text-base sm:text-lg font-semibold text-white truncate hidden">{teacher.name}</h3>
              </div>
            ) : (
              <h3 className="text-base sm:text-lg font-semibold text-white truncate">{teacher.name}</h3>
            )}
            <p className="text-blue-200 flex items-center space-x-1 text-sm">
              <BookOpen className="w-4 h-4" />
              <span className="truncate">{teacher.subject}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-200 touch-manipulation"
            title="Customize Design"
          >
            <Type className="w-4 h-4 text-purple-300" />
          </button>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            teacher.status === 'active' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {teacher.status === 'active' ? 'Active' : 'Expired'}
          </div>
        </div>
      </div>

      {/* Credentials */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {[
          { label: 'Email', value: teacher.email, icon: Mail },
          { label: 'Password', value: teacher.password, icon: Key },
          { label: 'Website', value: teacher.websiteUrl, icon: Globe },
          { label: 'Parent Portal', value: teacher.parentUrl, icon: User }
        ].map((item, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <item.icon className="w-4 h-4 text-blue-300 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-blue-200">{item.label}</p>
                  <p className="text-white text-xs sm:text-sm font-mono truncate">{item.value}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                {(item.label === 'Website' || item.label === 'Parent Portal') && (
                  <button
                    onClick={() => window.open(item.value, '_blank')}
                    className="p-1.5 sm:p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-200 touch-manipulation"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
                  </button>
                )}
                <button
                  onClick={() => copyToClipboard(item.value, `${teacher.id}-${item.label}`)}
                  className="p-1.5 sm:p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-200 touch-manipulation"
                >
                  {copiedField === `${teacher.id}-${item.label}` ? (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subscription Info */}
      <div className="bg-white/5 rounded-lg p-3 sm:p-4 mb-4 border border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-xs text-blue-200 mb-1">Registration Date</p>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-blue-300" />
              <p className="text-white text-xs sm:text-sm">
                {new Date(teacher.registrationDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-blue-200 mb-1">Subscription Status</p>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-blue-300" />
              <p className={`text-xs sm:text-sm font-medium ${
                isExpired ? 'text-red-300' : daysUntilExpiry <= 30 ? 'text-amber-300' : 'text-emerald-300'
              }`}>
                {isExpired ? 'Expired' : `${daysUntilExpiry} days left`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Panel */}
      {showCustomization && (
        <div className="bg-white/5 rounded-lg p-4 mb-4 border border-purple-500/30">
          <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
            <Type className="w-4 h-4 text-purple-300" />
            <span>Design Customization</span>
          </h4>
          
          <div className="space-y-4">
            {/* Custom Logo */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Custom Logo URL
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={tempCustomLogo}
                  onChange={(e) => setTempCustomLogo(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="https://example.com/logo.png"
                />
                <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-3 py-2 rounded-lg transition-all duration-200">
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Typography Image */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Typography Image URL
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={tempTypographyImage}
                  onChange={(e) => setTempTypographyImage(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="https://example.com/teacher-name-design.png"
                />
                <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-3 py-2 rounded-lg transition-all duration-200">
                  <Upload className="w-4 h-4" />
                </button>
              </div>
              <p className="text-purple-300 text-xs mt-1">
                Upload a custom designed image with the teacher's name
              </p>
            </div>

            {/* Typography Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">Use Custom Typography</span>
              <button
                onClick={() => {
                  // This would update the teacher's useCustomTypography setting
                  console.log('Toggle typography for teacher:', teacher.id);
                }}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  teacher.useCustomTypography 
                    ? 'bg-purple-500' 
                    : 'bg-white/20'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                  teacher.useCustomTypography ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={() => {
                // This would save the customization settings
                console.log('Save customization for teacher:', teacher.id);
                setShowCustomization(false);
              }}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              Save Design Changes
            </button>
          </div>
        </div>
      )}

      {/* Delete Button */}
      <div className="border-t border-white/10 pt-4">
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-300 border border-red-500/30 text-sm sm:text-base touch-manipulation"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Teacher & Reclaim Domain</span>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start space-x-2 text-amber-300 bg-amber-500/20 p-3 rounded-lg border border-amber-500/30">
              <AlertCircle className="w-5 h-5" />
              <p className="text-xs sm:text-sm font-medium">Are you sure? This action cannot be undone.</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 sm:py-2 px-4 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base touch-manipulation"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 sm:py-2 px-4 rounded-lg transition-all duration-200 border border-white/20 text-sm sm:text-base touch-manipulation"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}