
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserSubject {
  id: string;
  name: string;
  createdAt: string;
}

interface SubjectContextType {
  currentSubject: string | null;
  setCurrentSubject: (subject: string) => void;
  getSubjectData: (key: string) => any;
  setSubjectData: (key: string, data: any) => void;
  subjectName: string;
  getUserSubjects: () => UserSubject[];
  addUserSubject: (name: string) => void;
  removeUserSubject: (id: string) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const SubjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSubject, setCurrentSubjectState] = useState<string | null>(null);
  const [userSubjects, setUserSubjects] = useState<UserSubject[]>([]);

  useEffect(() => {
    // Load saved subject from localStorage
    const savedSubject = localStorage.getItem('edatlas-current-subject');
    if (savedSubject) {
      setCurrentSubjectState(savedSubject);
    }

    // Load user subjects from localStorage
    const savedSubjects = localStorage.getItem('edatlas-user-subjects');
    if (savedSubjects) {
      setUserSubjects(JSON.parse(savedSubjects));
    }
  }, []);

  const setCurrentSubject = (subject: string) => {
    setCurrentSubjectState(subject);
    localStorage.setItem('edatlas-current-subject', subject);
  };

  const getUserSubjects = (): UserSubject[] => {
    return userSubjects;
  };

  const addUserSubject = (name: string) => {
    const newSubject: UserSubject = {
      id: `subject-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      createdAt: new Date().toISOString()
    };
    
    const updatedSubjects = [...userSubjects, newSubject];
    setUserSubjects(updatedSubjects);
    localStorage.setItem('edatlas-user-subjects', JSON.stringify(updatedSubjects));
  };

  const removeUserSubject = (id: string) => {
    const updatedSubjects = userSubjects.filter(subject => subject.id !== id);
    setUserSubjects(updatedSubjects);
    localStorage.setItem('edatlas-user-subjects', JSON.stringify(updatedSubjects));
    
    // If the removed subject was the current one, clear current subject
    if (currentSubject === id) {
      setCurrentSubjectState(null);
      localStorage.removeItem('edatlas-current-subject');
    }
  };

  const getSubjectData = (key: string) => {
    if (!currentSubject) return null;
    const subjectKey = `edatlas-${currentSubject}-${key}`;
    const data = localStorage.getItem(subjectKey);
    return data ? JSON.parse(data) : null;
  };

  const setSubjectData = (key: string, data: any) => {
    if (!currentSubject) return;
    const subjectKey = `edatlas-${currentSubject}-${key}`;
    localStorage.setItem(subjectKey, JSON.stringify(data));
  };

  const getCurrentSubjectName = (): string => {
    if (!currentSubject) return 'Select Subject';
    const subject = userSubjects.find(s => s.id === currentSubject);
    return subject ? subject.name : 'Unknown Subject';
  };

  const subjectName = getCurrentSubjectName();

  return (
    <SubjectContext.Provider
      value={{
        currentSubject,
        setCurrentSubject,
        getSubjectData,
        setSubjectData,
        subjectName,
        getUserSubjects,
        addUserSubject,
        removeUserSubject
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = () => {
  const context = useContext(SubjectContext);
  if (context === undefined) {
    throw new Error('useSubject must be used within a SubjectProvider');
  }
  return context;
};
