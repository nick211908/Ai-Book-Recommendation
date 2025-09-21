import React from 'react';
import { BookOpen, Brain, Star } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AI CourseBook</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a>
            <div className="flex items-center space-x-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="text-sm text-slate-300 ml-2">4.9 from 2,000+ reviews</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;