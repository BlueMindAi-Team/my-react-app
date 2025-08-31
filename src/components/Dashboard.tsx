import React, { useState } from 'react';
import { Header } from './Header';
import { AddTeacherForm } from './AddTeacherForm';
import { TeacherList } from './TeacherList';
import { SystemStatus } from './SystemStatus';
import { useTeacher } from '../context/TeacherContext';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'status'>('add');
  const { teachers } = useTeacher();

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 bg-white/10 backdrop-blur-sm rounded-xl p-1 mb-6 sm:mb-8 w-full sm:w-fit">
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
              activeTab === 'add'
                ? 'bg-white text-blue-900 shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Add Teacher
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 relative text-sm sm:text-base ${
              activeTab === 'manage'
                ? 'bg-white text-blue-900 shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Manage Teachers
            {teachers.length > 0 && (
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                {teachers.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
              activeTab === 'status'
                ? 'bg-white text-blue-900 shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            System Status
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6 sm:space-y-8">
          {activeTab === 'add' && <AddTeacherForm />}
          {activeTab === 'manage' && <TeacherList />}
          {activeTab === 'status' && <SystemStatus />}
        </div>
      </div>
    </div>
  );
}