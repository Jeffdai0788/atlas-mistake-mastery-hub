
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/subject-selection');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in">
        {/* Logo */}
        <div className="animate-scale-in">
          <img 
            src="/lovable-uploads/4d3afe5c-a6ef-4c95-ad71-76913c3bdba8.png" 
            alt="EdAtlas Logo" 
            className="h-32 w-auto mx-auto"
          />
        </div>
        
        {/* Brand text */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">
            EdAtlas
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Mistake Logbook
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
