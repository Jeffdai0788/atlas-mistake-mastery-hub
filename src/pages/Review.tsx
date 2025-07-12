
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Review = () => {
  const navigate = useNavigate();
  const [currentProblem, setCurrentProblem] = useState(0);
  
  const problems = [
    {
      id: 1,
      subject: "Mathematics",
      topic: "Quadratic Functions",
      description: "Forgot to check for extraneous solutions when solving",
      addedDate: "3 days ago",
      difficulty: "Medium",
      reviewCount: 1
    },
    {
      id: 2,
      subject: "Physics",
      topic: "Kinematics",
      description: "Mixed up velocity and acceleration formulas",
      addedDate: "1 week ago", 
      difficulty: "Hard",
      reviewCount: 2
    },
    {
      id: 3,
      subject: "Chemistry",
      topic: "Stoichiometry",
      description: "Didn't balance the equation before calculating moles",
      addedDate: "5 days ago",
      difficulty: "Easy",
      reviewCount: 0
    }
  ];

  const handleResponse = (understood: boolean) => {
    const problem = problems[currentProblem];
    
    if (understood) {
      toast({
        title: "Great job! 🎉",
        description: "We'll review this again in 7 days.",
      });
    } else {
      toast({
        title: "No worries!",
        description: "We'll review this again tomorrow.",
      });
    }

    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const problem = problems[currentProblem];
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800", 
    Hard: "bg-red-100 text-red-800"
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-8 pb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-cyan-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-cyan-800">Review Session</h1>
            <p className="text-cyan-600 text-sm">
              Problem {currentProblem + 1} of {problems.length}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-cyan-200 h-2">
          <div 
            className="bg-gradient-to-r from-cyan-600 to-slate-600 h-2 transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          ></div>
        </div>

        {/* Problem Card */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-cyan-800">{problem.subject}</CardTitle>
                <p className="text-cyan-600 text-sm">{problem.topic}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium ${difficultyColors[problem.difficulty as keyof typeof difficultyColors]}`}>
                {problem.difficulty}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-cyan-50 p-4">
              <h3 className="font-medium text-cyan-800 mb-2">What you learned:</h3>
              <p className="text-cyan-700">{problem.description}</p>
            </div>

            <div className="flex justify-between text-sm text-cyan-600">
              <span>Added: {problem.addedDate}</span>
              <span>Reviews: {problem.reviewCount}</span>
            </div>

            {/* Mock problem image */}
            <div className="bg-gray-100 h-32 flex items-center justify-center">
              <span className="text-gray-500">Problem Image</span>
            </div>

            {/* Mock solution image */}
            <div className="bg-gray-100 h-32 flex items-center justify-center">
              <span className="text-gray-500">Solution Image</span>
            </div>
          </CardContent>
        </Card>

        {/* Response Buttons */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-cyan-800 text-center">
            Do you understand this problem now?
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleResponse(false)}
              variant="outline"
              className="h-16 border-2 border-red-200 hover:bg-red-50 text-red-700 hover:text-red-800"
            >
              <div className="text-center">
                <ThumbsDown className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm font-medium">Still Confused</span>
              </div>
            </Button>

            <Button
              onClick={() => handleResponse(true)}
              className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <div className="text-center">
                <ThumbsUp className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm font-medium">Got It!</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
