
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Calculator, Atom, Zap, Beaker } from 'lucide-react';
import { useSubject } from '@/contexts/SubjectContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const subjectIcons: Record<string, any> = {
  'specialist-mathematics': Calculator,
  'mathematical-methods': Atom,
  'physics': Zap,
  'chemistry': Beaker
};

const subjectColors: Record<string, string> = {
  'specialist-mathematics': 'text-blue-600',
  'mathematical-methods': 'text-purple-600',
  'physics': 'text-orange-600',
  'chemistry': 'text-green-600'
};

const SubjectSwitcher = () => {
  const { currentSubject, setCurrentSubject, subjectName } = useSubject();
  const navigate = useNavigate();

  const subjects = [
    { id: 'specialist-mathematics', name: 'Specialist Mathematics' },
    { id: 'mathematical-methods', name: 'Mathematical Methods' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' }
  ];

  const handleSubjectChange = (subjectId: string) => {
    setCurrentSubject(subjectId);
    navigate('/dashboard');
  };

  if (!currentSubject) {
    return null;
  }

  const CurrentIcon = subjectIcons[currentSubject];
  const currentColor = subjectColors[currentSubject];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-2 hover:bg-purple-50">
          <div className="flex items-center space-x-2">
            <CurrentIcon className={`h-4 w-4 ${currentColor}`} />
            <span className="text-sm font-medium text-purple-800 max-w-32 truncate">
              {subjectName}
            </span>
            <ChevronDown className="h-3 w-3 text-purple-600" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {subjects.map((subject) => {
          const Icon = subjectIcons[subject.id];
          const color = subjectColors[subject.id];
          const isActive = subject.id === currentSubject;
          
          return (
            <DropdownMenuItem
              key={subject.id}
              onClick={() => handleSubjectChange(subject.id)}
              className={`flex items-center space-x-2 ${isActive ? 'bg-purple-50' : ''}`}
            >
              <Icon className={`h-4 w-4 ${color}`} />
              <span className={isActive ? 'font-medium' : ''}>{subject.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SubjectSwitcher;
