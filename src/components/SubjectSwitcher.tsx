
import React from 'react';
import { Button } from '@/components/ui/button';
import { SquareChevronDown, RectangleHorizontal, SquarePlus } from 'lucide-react';
import { useSubject } from '@/contexts/SubjectContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const SubjectSwitcher = () => {
  const { currentSubject, setCurrentSubject, subjectName, getUserSubjects } = useSubject();
  const navigate = useNavigate();

  const userSubjects = getUserSubjects();

  const handleSubjectChange = (subjectId: string) => {
    setCurrentSubject(subjectId);
    navigate('/dashboard');
  };

  const handleAddSubject = () => {
    navigate('/subject-selection');
  };

  if (!currentSubject) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-2 hover:bg-cyan-50 border border-cyan-200 rounded-none">
          <div className="flex items-center space-x-2">
            <RectangleHorizontal className="h-4 w-4 text-cyan-600" />
            <span className="text-sm font-medium text-slate-700 max-w-32 truncate">
              {subjectName}
            </span>
            <SquareChevronDown className="h-3 w-3 text-cyan-600" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-white border-cyan-200">
        {userSubjects.map((subject) => {
          const isActive = subject.id === currentSubject;
          
          return (
            <DropdownMenuItem
              key={subject.id}
              onClick={() => handleSubjectChange(subject.id)}
              className={`flex items-center space-x-2 ${isActive ? 'bg-cyan-50' : ''}`}
            >
              <RectangleHorizontal className="h-4 w-4 text-cyan-600" />
              <span className={isActive ? 'font-medium' : ''}>{subject.name}</span>
            </DropdownMenuItem>
          );
        })}
        
        {userSubjects.length > 0 && <DropdownMenuSeparator />}
        
        <DropdownMenuItem
          onClick={handleAddSubject}
          className="flex items-center space-x-2 text-cyan-600"
        >
          <SquarePlus className="h-4 w-4" />
          <span>Add New Subject</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SubjectSwitcher;
