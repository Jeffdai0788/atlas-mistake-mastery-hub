
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, Camera, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const motivationalQuotes = [
    "Excellence is not a skill, it's an attitude.",
    "Every mistake is a stepping stone to mastery.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Your only limit is your mind.",
    "Great things never come from comfort zones."
  ];
  
  const todaysQuote = motivationalQuotes[new Date().getDay() % motivationalQuotes.length];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">EdAtlas</h1>
          <p className="text-purple-600 text-sm">Elite VCE Tutoring</p>
        </div>

        {/* Motivational Quote */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium italic">"{todaysQuote}"</p>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">24</div>
                <div className="text-sm text-purple-600">Problems Logged</div>
              </div>
              <div className="text-center p-4 bg-gold-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-700">18</div>
                <div className="text-sm text-amber-600">Problems Mastered</div>
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">7</div>
              <div className="text-sm text-green-600">Day Streak</div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Quick Actions</h2>
          
          <Button 
            onClick={() => navigate('/logbook')}
            className="w-full h-16 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Camera className="h-6 w-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Add New Problem</div>
              <div className="text-sm opacity-90">Log a mistake to learn from</div>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/review')}
            variant="outline"
            className="w-full h-16 border-2 border-purple-200 hover:bg-purple-50 transition-all duration-200 hover:scale-105"
          >
            <BookOpen className="h-6 w-6 mr-3 text-purple-600" />
            <div className="text-left">
              <div className="font-semibold text-purple-800">Review Due</div>
              <div className="text-sm text-purple-600">3 problems waiting</div>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/calendar')}
            variant="outline"
            className="w-full h-16 border-2 border-purple-200 hover:bg-purple-50 transition-all duration-200 hover:scale-105"
          >
            <Calendar className="h-6 w-6 mr-3 text-purple-600" />
            <div className="text-left">
              <div className="font-semibold text-purple-800">Study Calendar</div>
              <div className="text-sm text-purple-600">Track your progress</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
