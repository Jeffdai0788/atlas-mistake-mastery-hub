
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar as CalendarIcon, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data for calendar
  const studyData = {
    '2024-06-20': { problems: 2, reviews: 1 },
    '2024-06-21': { problems: 1, reviews: 3 }, 
    '2024-06-22': { problems: 3, reviews: 2 },
    '2024-06-23': { problems: 0, reviews: 1 },
    '2024-06-24': { problems: 1, reviews: 2 },
    '2024-06-25': { problems: 2, reviews: 0 }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getActivityLevel = (day: number) => {
    if (!day) return '';
    
    const dateStr = `2024-06-${day.toString().padStart(2, '0')}`;
    const data = studyData[dateStr as keyof typeof studyData];
    
    if (!data) return 'bg-gray-100';
    
    const total = data.problems + data.reviews;
    if (total === 0) return 'bg-gray-100';
    if (total <= 2) return 'bg-blue-200';
    if (total <= 4) return 'bg-blue-400';
    return 'bg-blue-600';
  };

  const days = getDaysInMonth(selectedDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-8 pb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-primary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Study Calendar</h1>
            <p className="text-primary/70 text-sm">Track your learning journey</p>
          </div>
        </div>

        {/* Calendar */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-primary p-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm
                    ${day ? getActivityLevel(day) : ''}
                    ${day ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
                    ${day && getActivityLevel(day).includes('blue-600') ? 'text-white' : 'text-primary'}
                  `}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-primary/70">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-gray-100"></div>
                <div className="w-3 h-3 bg-blue-200"></div>
                <div className="w-3 h-3 bg-blue-400"></div>
                <div className="w-3 h-3 bg-blue-600"></div>
              </div>
              <span>More</span>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/5">
                <div className="text-2xl font-bold text-primary">9</div>
                <div className="text-sm text-primary/70">Problems Added</div>
              </div>
              <div className="text-center p-4 bg-primary/5">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-primary/70">Reviews Done</div>
              </div>
            </div>
            
            <div className="mt-4 text-center p-4 bg-primary/5">
              <div className="text-2xl font-bold text-primary">85%</div>
              <div className="text-sm text-primary/70">Success Rate</div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Reviews */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-primary">Upcoming Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50">
                <div>
                  <div className="font-medium text-yellow-800">Tomorrow</div>
                  <div className="text-sm text-yellow-600">2 problems due</div>
                </div>
                <div className="w-2 h-2 bg-yellow-500"></div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-orange-50">
                <div>
                  <div className="font-medium text-orange-800">In 3 days</div>
                  <div className="text-sm text-orange-600">1 problem due</div>
                </div>
                <div className="w-2 h-2 bg-orange-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
