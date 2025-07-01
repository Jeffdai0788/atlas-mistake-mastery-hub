
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Atom, Zap, Beaker, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubject } from '@/contexts/SubjectContext';

const subjects = [
  {
    id: 'specialist-mathematics',
    name: 'Specialist Mathematics',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
    description: 'Advanced calculus, vectors, and complex numbers'
  },
  {
    id: 'mathematical-methods',
    name: 'Mathematical Methods',
    icon: Atom,
    color: 'from-purple-500 to-pink-500',
    description: 'Functions, calculus, and probability'
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    description: 'Motion, forces, energy, and waves'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: Beaker,
    color: 'from-green-500 to-emerald-500',
    description: 'Atoms, molecules, and chemical reactions'
  }
];

const SubjectSelection = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setCurrentSubject } = useSubject();

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setTimeout(() => {
      setCurrentSubject(subjectId);
      navigate('/dashboard');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-md mx-auto pt-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-3xl font-bold text-white">
            Choose Your Subject
          </h1>
          <p className="text-purple-200">
            Select the VCE subject you'd like to review
          </p>
        </div>

        {/* Subject Cards */}
        <div className="space-y-4">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            const isSelected = selectedSubject === subject.id;
            
            return (
              <Card
                key={subject.id}
                className={`
                  cursor-pointer transition-all duration-300 border-0 overflow-hidden
                  ${isSelected 
                    ? 'scale-105 shadow-2xl shadow-purple-500/25' 
                    : 'hover:scale-102 shadow-lg hover:shadow-xl'
                  }
                `}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => handleSubjectSelect(subject.id)}
              >
                <CardContent className="p-0">
                  <div className={`h-32 bg-gradient-to-r ${subject.color} relative overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-black/10">
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex items-center justify-between text-white">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold leading-tight">
                          {subject.name}
                        </h3>
                        <p className="text-sm text-white/80 leading-snug">
                          {subject.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Icon className="h-8 w-8" />
                        <ChevronRight 
                          className={`h-5 w-5 transition-transform ${
                            isSelected ? 'translate-x-1' : ''
                          }`} 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-purple-300 text-sm">
            You can switch subjects anytime from the dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
