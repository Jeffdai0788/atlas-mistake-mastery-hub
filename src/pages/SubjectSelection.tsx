
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ChevronRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubject } from '@/contexts/SubjectContext';

const SubjectSelection = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const navigate = useNavigate();
  const { setCurrentSubject, getUserSubjects, addUserSubject, removeUserSubject } = useSubject();

  const userSubjects = getUserSubjects();

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setTimeout(() => {
      setCurrentSubject(subjectId);
      navigate('/dashboard');
    }, 300);
  };

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      addUserSubject(newSubjectName.trim());
      setNewSubjectName('');
      setIsAddingSubject(false);
    }
  };

  const handleRemoveSubject = (subjectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeUserSubject(subjectId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-800 to-slate-900 p-4">
      <div className="max-w-md mx-auto pt-12 space-y-8">
        {/* Header with EdAtlas logo */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="mx-auto mb-4">
            <img 
              src="/lovable-uploads/4d3afe5c-a6ef-4c95-ad71-76913c3bdba8.png" 
              alt="EdAtlas Logo" 
              className="h-16 w-auto mx-auto drop-shadow-xl"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Choose Your Subject
          </h1>
          <p className="text-cyan-200">
            Select or add a subject you'd like to review
          </p>
        </div>

        {/* Add New Subject Section */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-cyan-500/20 to-slate-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            {!isAddingSubject ? (
              <Button
                onClick={() => setIsAddingSubject(true)}
                className="w-full bg-gradient-to-r from-cyan-600 to-slate-600 hover:from-cyan-700 hover:to-slate-700 text-white"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Subject
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject-name" className="text-white text-sm font-medium">
                    Subject Name
                  </Label>
                  <Input
                    id="subject-name"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    placeholder="e.g., Biology, English Literature"
                    className="mt-2 bg-white/90 border-cyan-200 focus:border-cyan-400"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={handleAddSubject}
                    disabled={!newSubjectName.trim()}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    Add Subject
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingSubject(false);
                      setNewSubjectName('');
                    }}
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User's Subjects */}
        {userSubjects.length > 0 && (
          <div className="space-y-4">
            {userSubjects.map((subject, index) => {
              const isSelected = selectedSubject === subject.id;
              
              return (
                <Card
                  key={subject.id}
                  className={`
                    cursor-pointer transition-all duration-300 border-0 overflow-hidden
                    ${isSelected 
                      ? 'scale-105 shadow-2xl shadow-cyan-500/25' 
                      : 'hover:scale-102 shadow-lg hover:shadow-xl'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                  onClick={() => handleSubjectSelect(subject.id)}
                >
                  <CardContent className="p-0">
                    <div className="h-32 bg-gradient-to-r from-cyan-600 to-slate-600 relative overflow-hidden">
                      {/* Background pattern */}
                      <div className="absolute inset-0 bg-black/10">
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-6 h-full flex items-center justify-between text-white">
                        <div className="space-y-2 flex-1">
                          <h3 className="text-xl font-bold leading-tight">
                            {subject.name}
                          </h3>
                          <p className="text-sm text-white/80 leading-snug">
                            Custom subject
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <BookOpen className="h-8 w-8" />
                          <div className="flex flex-col space-y-2">
                            <ChevronRight 
                              className={`h-5 w-5 transition-transform ${
                                isSelected ? 'translate-x-1' : ''
                              }`} 
                            />
                            <Button
                              onClick={(e) => handleRemoveSubject(subject.id, e)}
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-white/60 hover:text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {userSubjects.length === 0 && !isAddingSubject && (
          <Card className="shadow-lg border-0 bg-white/5 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Subjects Yet</h3>
              <p className="text-cyan-200 text-sm">
                Add your first subject to get started with your mistake logbook
              </p>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-cyan-300 text-sm">
            You can add, remove, and switch subjects anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
