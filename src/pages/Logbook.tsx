
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Upload, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Logbook = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [problemImage, setProblemImage] = useState<string | null>(null);
  const [solutionImage, setSolutionImage] = useState<string | null>(null);

  const handleImageUpload = (type: 'problem' | 'solution') => {
    // In a real app, this would open camera or file picker
    const mockImageUrl = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop`;
    
    if (type === 'problem') {
      setProblemImage(mockImageUrl);
    } else {
      setSolutionImage(mockImageUrl);
    }
    
    toast({
      title: "Image captured!",
      description: `${type} image has been added to your logbook entry.`,
    });
  };

  const handleSave = () => {
    if (!subject || !topic || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to database and schedule notifications
    toast({
      title: "Problem logged successfully!",
      description: "We'll remind you to review this in 1 day.",
    });

    navigate('/dashboard');
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
            className="text-blue-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-blue-800">Mistake Logbook</h1>
            <p className="text-blue-600 text-sm">Learn from every mistake</p>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-blue-800">New Problem Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-blue-700">Subject *</Label>
              <Input
                id="subject"
                placeholder="e.g., Mathematics, Physics, Chemistry"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic" className="text-blue-700">Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g., Quadratic Functions, Kinematics"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-blue-700">What went wrong? *</Label>
              <Textarea
                id="description"
                placeholder="Describe your mistake and what you learned..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-blue-200 focus:border-blue-400 min-h-24"
              />
            </div>

            {/* Image Upload Sections */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-blue-700">Problem Image</Label>
                {problemImage ? (
                  <div className="relative">
                    <img 
                      src={problemImage} 
                      alt="Problem" 
                      className="w-full h-32 object-cover"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleImageUpload('problem')}
                      className="absolute top-2 right-2"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleImageUpload('problem')}
                    className="w-full h-24 border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-50"
                  >
                    <div className="text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <span className="text-blue-600">Capture Problem</span>
                    </div>
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-blue-700">Solution Image</Label>
                {solutionImage ? (
                  <div className="relative">
                    <img 
                      src={solutionImage} 
                      alt="Solution" 
                      className="w-full h-32 object-cover"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleImageUpload('solution')}
                      className="absolute top-2 right-2"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleImageUpload('solution')}
                    className="w-full h-24 border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-50"
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <span className="text-blue-600">Add Solution</span>
                    </div>
                  </Button>
                )}
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg h-12"
            >
              <Check className="h-5 w-5 mr-2" />
              Save Problem
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Logbook;
