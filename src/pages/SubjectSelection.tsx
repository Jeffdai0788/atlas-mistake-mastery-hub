
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
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-12 space-y-8">
        {/* Header with EdAtlas logo */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="mx-auto mb-4">
            <img 
              src="/lovable-uploads/4d3afe5c-a6ef-4c95-ad71-76913c3bdba8.png" 
              alt="EdAtlas Logo" 
              className="h-16 w-auto mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Choose Your Subject
          </h1>
          <p className="text-muted-foreground">
            Select or add a subject you'd like to review
          </p>
        </div>

        {/* Add New Subject Section */}
        <Card className="shadow-lg border rounded-none">
          <CardContent className="p-6">
            {!isAddingSubject ? (
              <Button
                onClick={() => setIsAddingSubject(true)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-none"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Subject
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject-name" className="text-foreground text-sm font-medium">
                    Subject Name
                  </Label>
                  <Input
                    id="subject-name"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    placeholder="e.g., Biology, English Literature"
                    className="mt-2 rounded-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={handleAddSubject}
                    disabled={!newSubjectName.trim()}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none"
                  >
                    Add Subject
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingSubject(false);
                      setNewSubjectName('');
                    }}
                    variant="outline"
                    className="flex-1 rounded-none"
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
                    cursor-pointer transition-all duration-300 border rounded-none overflow-hidden
                    ${isSelected 
                      ? 'scale-105 shadow-2xl shadow-primary/25' 
                      : 'hover:scale-102 shadow-lg hover:shadow-xl'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                  onClick={() => handleSubjectSelect(subject.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground leading-tight">
                          {subject.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Custom subject
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <ChevronRight 
                          className={`h-5 w-5 text-muted-foreground transition-transform ${
                            isSelected ? 'translate-x-1' : ''
                          }`} 
                        />
                        <Button
                          onClick={(e) => handleRemoveSubject(subject.id, e)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-none"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
          <Card className="shadow-lg border rounded-none">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">No Subjects Yet</h3>
              <p className="text-muted-foreground text-sm">
                Add your first subject to get started with your mistake logbook
              </p>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-muted-foreground text-sm">
            You can add, remove, and switch subjects anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
