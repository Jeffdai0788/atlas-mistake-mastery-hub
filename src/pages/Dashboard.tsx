
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Square, BarChart3, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubject } from '@/contexts/SubjectContext';
import SubjectSwitcher from '@/components/SubjectSwitcher';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentSubject, subjectName } = useSubject();
  
  // Redirect to welcome if no subject selected
  React.useEffect(() => {
    if (!currentSubject) {
      navigate('/');
    }
  }, [currentSubject, navigate]);

  const motivationalQuotes = [
    "Excellence is not a skill, it's an attitude.",
    "Every mistake is a stepping stone to mastery.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Your only limit is your mind.",
    "Great things never come from comfort zones."
  ];
  
  const todaysQuote = motivationalQuotes[new Date().getDay() % motivationalQuotes.length];

  // Mock data for frequency graph - in real app, this would come from stored data
  const frequencyData = [
    { day: 'Mon', problems: 3 },
    { day: 'Tue', problems: 5 },
    { day: 'Wed', problems: 2 },
    { day: 'Thu', problems: 8 },
    { day: 'Fri', problems: 4 },
    { day: 'Sat', problems: 6 },
    { day: 'Sun', problems: 1 },
  ];

  const chartConfig = {
    problems: {
      label: "Problems Logged",
      color: "#069EB7",
    },
  };

  if (!currentSubject) {
    return null; // Will redirect to welcome
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header with EdAtlas branding */}
        <div className="text-center pt-8 pb-4">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/4d3afe5c-a6ef-4c95-ad71-76913c3bdba8.png" 
              alt="EdAtlas Logo" 
              className="h-12 w-auto"
            />
          </div>
          <p className="text-slate-600 text-sm mb-4">Elite VCE Tutoring</p>
          <SubjectSwitcher />
        </div>

        {/* Motivational Quote */}
        <Card className="bg-gradient-to-r from-cyan-600 to-slate-700 text-white border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium italic">"{todaysQuote}"</p>
          </CardContent>
        </Card>

        {/* Activity Frequency Graph */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-slate-700 flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-600" />
              Weekly Activity - {subjectName}
            </CardTitle>
            <CardDescription>Problems logged over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48">
              <BarChart data={frequencyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="problems" fill="var(--color-problems)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-slate-700 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-cyan-600" />
              Your Progress - {subjectName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                <div className="text-2xl font-bold text-cyan-700">24</div>
                <div className="text-sm text-cyan-600">Problems Logged</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-slate-700">18</div>
                <div className="text-sm text-slate-600">Problems Mastered</div>
              </div>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-700">7</div>
              <div className="text-sm text-emerald-600">Day Streak</div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Quick Actions</h2>
          
          <Button 
            onClick={() => navigate('/logbook')}
            className="w-full h-16 bg-gradient-to-r from-cyan-600 to-slate-600 hover:from-cyan-700 hover:to-slate-700 text-white shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Square className="h-6 w-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Add New Problem</div>
              <div className="text-sm opacity-90">Log a mistake to learn from</div>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/review')}
            variant="outline"
            className="w-full h-16 border-2 border-cyan-200 hover:bg-cyan-50 transition-all duration-200 hover:scale-105"
          >
            <FileText className="h-6 w-6 mr-3 text-cyan-600" />
            <div className="text-left">
              <div className="font-semibold text-slate-700">Review Due</div>
              <div className="text-sm text-slate-600">3 problems waiting</div>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/calendar')}
            variant="outline"
            className="w-full h-16 border-2 border-cyan-200 hover:bg-cyan-50 transition-all duration-200 hover:scale-105"
          >
            <Calendar className="h-6 w-6 mr-3 text-cyan-600" />
            <div className="text-left">
              <div className="font-semibold text-slate-700">Study Calendar</div>
              <div className="text-sm text-slate-600">Track your progress</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
