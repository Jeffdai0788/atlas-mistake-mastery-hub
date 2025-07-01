
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubjectContextType {
  currentSubject: string | null;
  setCurrentSubject: (subject: string) => void;
  getSubjectData: (key: string) => any;
  setSubjectData: (key: string, data: any) => void;
  subjectName: string;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

const subjectNames: Record<string, string> = {
  'specialist-mathematics': 'Specialist Mathematics',
  'mathematical-methods': 'Mathematical Methods',
  'physics': 'Physics',
  'chemistry': 'Chemistry'
};

export const SubjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSubject, setCurrentSubjectState] = useState<string | null>(null);

  useEffect(() => {
    // Load saved subject from localStorage
    const savedSubject = localStorage.getItem('edatlas-current-subject');
    if (savedSubject) {
      setCurrentSubjectState(savedSubject);
    }
  }, []);

  const setCurrentSubject = (subject: string) => {
    setCurrentSubjectState(subject);
    localStorage.setItem('edatlas-current-subject', subject);
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

  const subjectName = currentSubject ? subjectNames[currentSubject] || currentSubject : 'Select Subject';

  return (
    <SubjectContext.Provider
      value={{
        currentSubject,
        setCurrentSubject,
        getSubjectData,
        setSubjectData,
        subjectName
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
