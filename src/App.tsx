import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { TeacherProvider } from './context/TeacherContext';

function App() {
  return (
    <TeacherProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <Dashboard />
      </div>
    </TeacherProvider>
  );
}

export default App;