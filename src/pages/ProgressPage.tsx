import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Brain, CheckCircle, Clock, FileText, Map, BookOpen } from 'lucide-react';

const ProgressPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { name: 'Analyzing Topic', description: 'Understanding your course requirements', icon: Brain },
    { name: 'Generating Syllabus', description: 'Creating comprehensive course outline', icon: FileText },
    { name: 'Creating Content', description: 'Developing chapters and examples', icon: BookOpen },
    { name: 'Building Mindmaps', description: 'Generating visual learning aids', icon: Map },
    { name: 'Finalizing Course', description: 'Compiling everything together', icon: CheckCircle }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate(`/course/${id}`), 1000);
          return 100;
        }
        
        const newProgress = prev + Math.random() * 8 + 2;
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));
        
        return Math.min(newProgress, 100);
      });
    }, 300);

    return () => clearInterval(timer);
  }, [id, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Generating Your Course</h1>
            <p className="text-slate-300">Please wait while we create your personalized learning materials...</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Progress</span>
              <span className="text-blue-400 font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-500/20 border border-blue-500/50' 
                      : isCompleted 
                      ? 'bg-green-500/10 border border-green-500/30' 
                      : 'bg-slate-700/30 border border-slate-600/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    isActive 
                      ? 'bg-blue-500 animate-pulse' 
                      : isCompleted 
                      ? 'bg-green-500' 
                      : 'bg-slate-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : isActive ? (
                      <Icon className="h-5 w-5 text-white animate-spin" />
                    ) : (
                      <Clock className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      isActive || isCompleted ? 'text-white' : 'text-slate-400'
                    }`}>
                      {step.name}
                    </h3>
                    <p className={`text-sm ${
                      isActive || isCompleted ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {progress === 100 && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full border border-green-500/50">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-green-400 font-semibold">Course Generated Successfully!</span>
              </div>
              <p className="text-slate-300 mt-2">Redirecting to your course...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;