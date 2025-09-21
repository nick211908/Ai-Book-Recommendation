import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Download, Brain, Lightbulb, FileText, Star, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Medium');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    const courseId = Date.now().toString();
    
    // Store course data in localStorage for demo
    localStorage.setItem('courseData', JSON.stringify({
      id: courseId,
      topic,
      level,
      status: 'generating'
    }));
    
    navigate(`/generate/${courseId}`);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                <Brain className="h-4 w-4 mr-2" />
                Trusted by 30,000+ Users Worldwide
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  AI Course-Book
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                    Made Simple
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                  Generate comprehensive course books with AI assistance and 
                  intelligent content creation. Get professional learning materials 
                  instantly, without the complexity or cost.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">Generate Your Course Book</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Course Topic
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Machine Learning, Web Development"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="Medium">Medium</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Research">Research</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleGenerate}
                      disabled={!topic.trim() || isLoading}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Brain className="h-5 w-5" />
                          Generate Course
                        </>
                      )}
                    </button>
                    
                    <button className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Preview Sample
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center mt-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-sm text-slate-300 ml-2">4.9 from 2,000+ reviews</span>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="AI Learning" 
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
                
                {/* AI Assistant Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white font-semibold">AI Course Assistant</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">
                    What should I look for in an employment contract?
                  </p>
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-3 border border-blue-500/30">
                    <p className="text-blue-200 text-sm">
                      I'll analyze key terms and create comprehensive course materials covering employment law, contract clauses, and negotiation strategies...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Powerful Learning Tools at Your Fingertips
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose from our comprehensive suite of AI-powered course generation solutions 
              designed for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Course Assistant</h3>
              <p className="text-slate-300 mb-4">
                Get instant answers to learning questions with our advanced AI 
                chatbot trained on comprehensive educational databases and case studies.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  24/7 Availability
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Instant responses
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Legal case reviewed
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Easy to understand
                </div>
              </div>
              <button className="mt-6 text-blue-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Try it now <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">PDF Course Books</h3>
              <p className="text-slate-300 mb-4">
                Upload and analyze documents for potential issues, missing 
                clauses, compliance, and improvement recommendations.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Risk assessment
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Clause analysis
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Compliance checking
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Improvement suggestions
                </div>
              </div>
              <button className="mt-6 text-cyan-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Try it now <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Advanced Course Analysis</h3>
              <p className="text-slate-300 mb-4">
                Harness the power of AI to analyze course documents with precision 
                and accuracy. Identifying potential issues and providing 
                actionable recommendations.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Content Risk Assessment
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Course Research Assistant
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Document Summarization
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Improvement suggestions
                </div>
              </div>
              <button className="mt-6 text-purple-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Try it now <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            See what our users say about their experience with AI CourseBook
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Williams",
                role: "Senior Developer",
                company: "Microsoft",
                content: "CourseBook AI helped me understand my employment contract and identify potential risks I couldn't spot before. Their explanations are clear and actionable.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Data Scientist",
                company: "Google",
                content: "As a Recent convert, this platform saves me hours of legal contract reading. The AI provides accurate clause breakdowns complete within hours or day.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Startup Founder",
                company: "TechStart Inc",
                content: "Before signing any client contracts, I run it through CourseBook AI to spot red flags. My legal expenses have significantly decreased since I started."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                    <p className="text-slate-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning Workflow?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of professionals who trust CourseBook AI for their learning 
            technology needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              Try Live CourseBook
            </button>
            <button className="bg-slate-700/50 hover:bg-slate-600/50 text-white px-8 py-4 rounded-lg font-semibold text-lg border border-slate-600 hover:border-slate-500 transition-all duration-200">
              Check My Contract
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;