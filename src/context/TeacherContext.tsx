import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Teacher } from '../types/Teacher';

interface TeacherContextType {
  teachers: Teacher[];
  addTeacher: (teacher: Teacher) => void;
  deleteTeacher: (id: string) => void;
  selectedTeachers: string[];
  toggleTeacherSelection: (id: string) => void;
  selectAllTeachers: () => void;
  clearSelection: () => void;
  deleteSelectedTeachers: () => void;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);

  const addTeacher = (teacher: Teacher) => {
    setTeachers(prev => [...prev, teacher]);
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
    setSelectedTeachers(prev => prev.filter(teacherId => teacherId !== id));
  };

  const toggleTeacherSelection = (id: string) => {
    setSelectedTeachers(prev => 
      prev.includes(id) 
        ? prev.filter(teacherId => teacherId !== id)
        : [...prev, id]
    );
  };

  const selectAllTeachers = () => {
    setSelectedTeachers(teachers.map(teacher => teacher.id));
  };

  const clearSelection = () => {
    setSelectedTeachers([]);
  };

  const deleteSelectedTeachers = () => {
    setTeachers(prev => prev.filter(teacher => !selectedTeachers.includes(teacher.id)));
    setSelectedTeachers([]);
  };
  return (
    <TeacherContext.Provider value={{ 
      teachers, 
      addTeacher, 
      deleteTeacher,
      selectedTeachers,
      toggleTeacherSelection,
      selectAllTeachers,
      clearSelection,
      deleteSelectedTeachers
    }}>
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeacher() {
  const context = useContext(TeacherContext);
  if (context === undefined) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }
  return context;
}