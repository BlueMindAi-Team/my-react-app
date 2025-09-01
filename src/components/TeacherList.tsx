import React, { useState } from 'react';
import { TeacherCard } from './TeacherCard';
import { useTeacher } from '../context/TeacherContext';
import { BulkActionsPanel } from './BulkActionsPanel';
import { 
  Users, Search, Filter, CheckSquare, Square, 
  Trash2, AlertCircle, Download, Mail, Globe 
} from 'lucide-react';

export function TeacherList() {
  const { 
    teachers, 
    selectedTeachers, 
    selectAllTeachers, 
    clearSelection, 
    deleteSelectedTeachers,
    toggleTeacherSelection
  } = useTeacher();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired'>('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.domain.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && teacher.status === 'active') ||
                         (filterStatus === 'expired' && teacher.status === 'expired');
    
    return matchesSearch && matchesFilter;
  });

  const allFilteredSelected = filteredTeachers.length > 0 && 
    filteredTeachers.every(teacher => selectedTeachers.includes(teacher.id));
  const someFilteredSelected = filteredTeachers.some(teacher => selectedTeachers.includes(teacher.id));

  const handleSelectAll = () => {
    if (allFilteredSelected) {
      // Deselect all filtered teachers
      clearSelection();
    } else {
      // Select all filtered teachers
      filteredTeachers.forEach(teacher => {
        if (!selectedTeachers.includes(teacher.id)) {
          toggleTeacherSelection(teacher.id);
        }
      });
    }
  };

  const handleBulkDelete = () => {
    deleteSelectedTeachers();
    setShowDeleteConfirm(false);
  };

  const exportSelectedData = () => {
    const selectedData = teachers.filter(teacher => selectedTeachers.includes(teacher.id));
    const csvContent = [
      'Name,Subject,Domain,Email,Password,Website URL,Parent Portal URL,Registration Date,Subscription Expiry,Status',
      ...selectedData.map(teacher => 
        `"${teacher.name}","${teacher.subject}","${teacher.domain}","${teacher.email}","${teacher.password}","${teacher.websiteUrl}","${teacher.parentUrl}","${teacher.registrationDate}","${teacher.subscriptionExpiry}","${teacher.status}"`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teachers-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  if (teachers.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No Teachers Yet</h3>
        <p className="text-sm sm:text-base text-blue-200 mb-6 px-4">Start by adding your first teacher to the system</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search and Filter */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
        <div className="flex flex-col gap-4">
          {/* Search and Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search teachers, subjects, or domains..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full sm:w-auto pl-12 pr-8 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              >
                <option value="all">All Teachers</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Selection Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSelectAll}
                className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors duration-200"
              >
                {allFilteredSelected ? (
                  <CheckSquare className="w-5 h-5" />
                ) : someFilteredSelected ? (
                  <div className="w-5 h-5 border-2 border-blue-400 rounded bg-blue-400/50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-sm"></div>
                  </div>
                ) : (
                  <Square className="w-5 h-5" />
                )}
                <span className="text-sm">
                  {allFilteredSelected ? 'Deselect All' : 'Select All'}
                  {filteredTeachers.length > 0 && ` (${filteredTeachers.length})`}
                </span>
              </button>
              
              {selectedTeachers.length > 0 && (
                <div className="text-blue-200 text-sm">
                  {selectedTeachers.length} teacher{selectedTeachers.length !== 1 ? 's' : ''} selected
                </div>
              )}
            </div>

            {/* Bulk Actions */}
            {selectedTeachers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={exportSelectedData}
                  className="flex items-center space-x-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 text-sm border border-emerald-500/30"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 text-sm border border-red-500/30"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete ({selectedTeachers.length})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Actions Panel */}
      {selectedTeachers.length > 0 && <BulkActionsPanel />}

      {/* Bulk Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Confirm Bulk Delete</h3>
                <p className="text-red-300 text-sm">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-white mb-6">
              Are you sure you want to delete <strong>{selectedTeachers.length}</strong> teacher{selectedTeachers.length !== 1 ? 's' : ''}? 
              This will permanently remove their accounts and reclaim their domains.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleBulkDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium"
              >
                Yes, Delete All
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg transition-all duration-200 border border-white/20"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredTeachers.map((teacher) => (
          <TeacherCard 
            key={teacher.id} 
            teacher={teacher} 
            showSelection={teachers.length > 1}
          />
        ))}
      </div>

      {filteredTeachers.length === 0 && teachers.length > 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-blue-200 text-sm sm:text-base px-4">No teachers match your search criteria</p>
        </div>
      )}
    </div>
  );
}
        </div>
      )}
    </div>
  );
}