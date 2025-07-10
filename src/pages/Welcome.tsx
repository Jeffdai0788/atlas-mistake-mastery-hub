
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [showSwipe, setShowSwipe] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSwipe(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSwipeRight = () => {
    navigate('/subject-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-800 to-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center space-y-8 animate-fade-in">
        {/* Logo and branding */}
        <div className="space-y-4">
          <div className="mx-auto mb-6 animate-scale-in">
            <img 
              src="/lovable-uploads/4d3afe5c-a6ef-4c95-ad71-76913c3bdba8.png" 
              alt="EdAtlas Logo" 
              className="h-24 w-auto mx-auto drop-shadow-2xl"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-xl text-cyan-200 font-medium">
              Elite VCE Tutoring
            </p>
          </div>
        </div>

        {/* Welcome message */}
        <div className="space-y-4 max-w-sm mx-auto">
          <h2 className="text-2xl font-semibold text-white">
            Welcome to your
          </h2>
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-slate-300">
            Mistake Logbook
          </h3>
          <p className="text-cyan-200 text-lg leading-relaxed">
            Transform every mistake into mastery with spaced repetition learning
          </p>
        </div>

        {/* Swipe to continue */}
        <div className={`transition-all duration-1000 ${showSwipe ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3 text-cyan-200">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-cyan-300"></div>
              <span className="text-sm font-medium">Swipe right to begin</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-cyan-300"></div>
            </div>
            
            <Button
              onClick={handleSwipeRight}
              className="group bg-gradient-to-r from-cyan-500 to-slate-600 hover:from-cyan-600 hover:to-slate-700 text-white border-0 h-14 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25"
            >
              <span className="text-lg font-medium mr-2">Get Started</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-ping`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Welcome;
