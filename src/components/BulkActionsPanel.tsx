import React, { useState } from 'react';
import { 
  Mail, Globe, Calendar, Users, Send, 
  CheckCircle, AlertCircle, Clock 
} from 'lucide-react';
import { useTeacher } from '../context/TeacherContext';

export function BulkActionsPanel() {
  const { selectedTeachers, teachers } = useTeacher();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionResult, setActionResult] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const selectedTeacherData = teachers.filter(teacher => selectedTeachers.includes(teacher.id));

  const handleAction = async (action: string) => {
    setIsProcessing(true);
    setActiveAction(action);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let message = '';
    switch (action) {
      case 'send-credentials':
        message = `Credentials sent to ${selectedTeachers.length} teacher${selectedTeachers.length !== 1 ? 's' : ''}`;
        break;
      case 'update-domains':
        message = `Domain settings updated for ${selectedTeachers.length} teacher${selectedTeachers.length !== 1 ? 's' : ''}`;
        break;
      case 'extend-subscription':
        message = `Subscription extended for ${selectedTeachers.length} teacher${selectedTeachers.length !== 1 ? 's' : ''}`;
        break;
      default:
        message = 'Action completed successfully';
    }
    
    setActionResult({ type: 'success', message });
    setIsProcessing(false);
    setActiveAction(null);
    
    // Clear result after 3 seconds
    setTimeout(() => setActionResult(null), 3000);
  };

  if (selectedTeachers.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-blue-300" />
          <h3 className="text-white font-medium">
            Bulk Actions ({selectedTeachers.length} selected)
          </h3>
        </div>
        
        {actionResult && (
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
            actionResult.type === 'success' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {actionResult.type === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm">{actionResult.message}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => handleAction('send-credentials')}
          disabled={isProcessing}
          className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 disabled:bg-white/5 text-white py-3 px-4 rounded-lg transition-all duration-200 text-sm disabled:opacity-50"
        >
          {isProcessing && activeAction === 'send-credentials' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              <span>Send Credentials</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleAction('update-domains')}
          disabled={isProcessing}
          className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 disabled:bg-white/5 text-white py-3 px-4 rounded-lg transition-all duration-200 text-sm disabled:opacity-50"
        >
          {isProcessing && activeAction === 'update-domains' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Updating...</span>
            </>
          ) : (
            <>
              <Globe className="w-4 h-4" />
              <span>Update Domains</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleAction('extend-subscription')}
          disabled={isProcessing}
          className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 disabled:bg-white/5 text-white py-3 px-4 rounded-lg transition-all duration-200 text-sm disabled:opacity-50"
        >
          {isProcessing && activeAction === 'extend-subscription' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Extending...</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Extend Subscription</span>
            </>
          )}
        </button>
      </div>

      {/* Selected Teachers Summary */}
      <div className="mt-4 pt-4 border-t border-blue-500/20">
        <p className="text-blue-200 text-sm mb-2">Selected Teachers:</p>
        <div className="flex flex-wrap gap-2">
          {selectedTeacherData.slice(0, 5).map((teacher) => (
            <span
              key={teacher.id}
              className="bg-white/10 text-white px-3 py-1 rounded-full text-xs border border-white/20"
            >
              {teacher.name}
            </span>
          ))}
          {selectedTeacherData.length > 5 && (
            <span className="bg-white/10 text-blue-300 px-3 py-1 rounded-full text-xs border border-white/20">
              +{selectedTeacherData.length - 5} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}