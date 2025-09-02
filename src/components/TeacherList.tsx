import React, { useState } from 'react';
import { Search, Filter, Users, CheckSquare, Square, Trash2, AlertCircle } from 'lucide-react';
import { useTeacher } from '../context/TeacherContext';
import { TeacherCard } from './TeacherCard';
import { BulkActionsPanel } from './BulkActionsPanel';

export function TeacherList() {
  const { 
    teachers, 
    selectedTeachers, 
    selectAllTeachers, 
    clearSelection, 
    deleteSelectedTeachers 
  } = useTeacher();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired'>('all');
  const [showBulkDelete, setShowBulkDelete] = useState(false);

  // Filter teachers based on search and status
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || teacher.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const allSelected = filteredTeachers.length > 0 && filteredTeachers.every(teacher => selectedTeachers.includes(teacher.id));
  const someSelected = filteredTeachers.some(teacher => selectedTeachers.includes(teacher.id));

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllTeachers();
    }
  };

  const handleBulkDelete = async () => {
    deleteSelectedTeachers();
    setShowBulkDelete(false);
  };

  if (teachers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-blue-300" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Teachers Added Yet</h3>
        <p className="text-blue-200">Start by adding your first teacher to the platform</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Search teachers by name, subject, or email..."
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-blue-300" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-white/5 border border-white/20 rounded-xl text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="all" className="bg-gray-800">All Teachers</option>
              <option value="active" className="bg-gray-800">Active Only</option>
              <option value="expired" className="bg-gray-800">Expired Only</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-white/10 space-y-3 sm:space-y-0">
          <p className="text-blue-200 text-sm">
            Showing {filteredTeachers.length} of {teachers.length} teachers
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
          
          {/* Selection Controls */}
          {filteredTeachers.length > 0 && (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSelectAll}
                className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors text-sm"
              >
                {allSelected ? (
                  <CheckSquare className="w-4 h-4" />
                ) : someSelected ? (
                  <div className="w-4 h-4 border border-blue-300 rounded bg-blue-500/50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-300 rounded-sm"></div>
                  </div>
                ) : (
                  <Square className="w-4 h-4" />
                )}
                <span>
                  {allSelected ? 'Deselect All' : 'Select All'}
                </span>
              </button>
              
              {selectedTeachers.length > 0 && (
                <span className="text-emerald-300 text-sm font-medium">
                  {selectedTeachers.length} selected
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions Panel */}
      <BulkActionsPanel />

      {/* Bulk Delete Panel */}
      {selectedTeachers.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 sm:p-6">
          {!showBulkDelete ? (
            <button
              onClick={() => setShowBulkDelete(true)}
              className="w-full flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 px-4 rounded-xl transition-all duration-300 border border-red-500/30"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Selected Teachers ({selectedTeachers.length})</span>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-amber-300 bg-amber-500/20 p-4 rounded-lg border border-amber-500/30">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Confirm Bulk Deletion</p>
                  <p className="text-sm">
                    You are about to delete {selectedTeachers.length} teacher{selectedTeachers.length !== 1 ? 's' : ''} and reclaim their domains. 
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleBulkDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium"
                >
                  Yes, Delete All Selected
                </button>
                <button
                  onClick={() => setShowBulkDelete(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl transition-all duration-200 border border-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Teachers Grid */}
      {filteredTeachers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredTeachers.map((teacher) => (
            <TeacherCard 
              key={teacher.id} 
              teacher={teacher} 
              showSelection={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-blue-300" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Teachers Found</h3>
          <p className="text-blue-200">
            {searchTerm 
              ? `No teachers match "${searchTerm}"`
              : `No ${filterStatus} teachers found`
            }
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-400 hover:text-white transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}