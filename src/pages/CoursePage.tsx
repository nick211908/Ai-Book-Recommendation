import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, BookOpen, Map, FileText, Brain, CheckCircle } from 'lucide-react';
import MindmapComponent from '../components/MindmapComponent';

interface CourseData {
  id: string;
  topic: string;
  level: string;
  syllabus: {
    title: string;
    chapters: Array<{
      id: number;
      title: string;
      content: string;
      examples: string[];
      exercises: string[];
    }>;
  };
  mindmap: string;
}

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [viewMode, setViewMode] = useState<'content' | 'mindmap'>('content');

  useEffect(() => {
    // Load course data from localStorage or API
    const storedData = localStorage.getItem('courseData');
    if (storedData) {
      const data = JSON.parse(storedData);
      
      // Generate sample course content
      const sampleCourse: CourseData = {
        id: data.id,
        topic: data.topic,
        level: data.level,
        syllabus: {
          title: `Complete Guide to ${data.topic}`,
          chapters: [
            {
              id: 1,
              title: `Introduction to ${data.topic}`,
              content: `
                <h2>Welcome to ${data.topic}</h2>
                <p>This comprehensive course will guide you through the fundamental concepts and advanced techniques in ${data.topic}. Whether you're a beginner or looking to advance your skills, this course is designed to provide practical knowledge and real-world applications.</p>
                
                <h3>What You'll Learn</h3>
                <ul>
                  <li>Core concepts and principles</li>
                  <li>Practical implementation techniques</li>
                  <li>Industry best practices</li>
                  <li>Real-world applications and case studies</li>
                </ul>

                <h3>Prerequisites</h3>
                <p>To get the most out of this course, you should have:</p>
                <ul>
                  <li>Basic understanding of programming concepts</li>
                  <li>Familiarity with data structures</li>
                  <li>Willingness to learn and experiment</li>
                </ul>
              `,
              examples: [
                "Hello World implementation",
                "Basic data structure example",
                "Simple algorithm demonstration"
              ],
              exercises: [
                "Set up your development environment",
                "Complete the introductory quiz",
                "Write your first program"
              ]
            },
            {
              id: 2,
              title: `Core Concepts in ${data.topic}`,
              content: `
                <h2>Fundamental Principles</h2>
                <p>In this chapter, we'll dive deep into the core concepts that form the foundation of ${data.topic}. Understanding these principles is crucial for building expertise in this field.</p>

                <h3>Key Concepts</h3>
                <p>The following concepts are essential building blocks:</p>
                <ul>
                  <li><strong>Concept 1:</strong> Understanding the basic framework and its components</li>
                  <li><strong>Concept 2:</strong> Data flow and processing mechanisms</li>
                  <li><strong>Concept 3:</strong> Optimization strategies and performance considerations</li>
                </ul>

                <h3>Practical Applications</h3>
                <p>These concepts are applied in various real-world scenarios:</p>
                <ol>
                  <li>Enterprise-level implementations</li>
                  <li>Research and development projects</li>
                  <li>Startup and prototype development</li>
                </ol>
              `,
              examples: [
                "Advanced data processing pipeline",
                "Optimization algorithm implementation",
                "Performance benchmarking example"
              ],
              exercises: [
                "Implement a basic algorithm",
                "Optimize existing code",
                "Build a small prototype"
              ]
            }
          ]
        },
        mindmap: `graph TD
          A[${data.topic}] --> B[Fundamentals]
          A --> C[Applications]
          A --> D[Advanced Topics]
          
          B --> B1[Basic Concepts]
          B --> B2[Core Principles]
          B --> B3[Getting Started]
          
          C --> C1[Real-world Use Cases]
          C --> C2[Industry Applications]
          C --> C3[Project Examples]
          
          D --> D1[Expert Techniques]
          D --> D2[Research Areas]
          D --> D3[Future Trends]`
      };
      
      setCourseData(sampleCourse);
    }
  }, [id]);

  const handleDownloadPDF = () => {
    // Mock PDF download
    alert('PDF download would be implemented here with Puppeteer');
  };

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{courseData.syllabus.title}</h1>
              <div className="flex items-center gap-4 text-slate-300">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                  <Brain className="h-4 w-4 mr-2" />
                  {courseData.level} Level
                </span>
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {courseData.syllabus.chapters.length} Chapters
                </span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'content' ? 'mindmap' : 'content')}
                className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                <Map className="h-5 w-5" />
                {viewMode === 'content' ? 'View Mindmap' : 'View Content'}
              </button>
              
              <button
                onClick={handleDownloadPDF}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Course Contents
              </h3>
              
              <div className="space-y-2">
                {courseData.syllabus.chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapter(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      activeChapter === index
                        ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        activeChapter === index
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-600 text-slate-300'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium">{chapter.title}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <button 
                  onClick={() => setViewMode('mindmap')}
                  className="w-full p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/50 rounded-lg text-purple-400 font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Map className="h-5 w-5" />
                  Course Mindmap
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/30 overflow-hidden">
              {viewMode === 'content' ? (
                <div className="p-8">
                  <div className="prose prose-invert prose-lg max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: courseData.syllabus.chapters[activeChapter].content 
                      }} 
                    />
                  </div>

                  {/* Examples Section */}
                  <div className="mt-12 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Code Examples
                    </h3>
                    <div className="space-y-3">
                      {courseData.syllabus.chapters[activeChapter].examples.map((example, index) => (
                        <div key={index} className="bg-slate-900/50 p-4 rounded-lg">
                          <p className="text-slate-300">{example}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exercises Section */}
                  <div className="mt-8 p-6 bg-green-500/10 rounded-xl border border-green-500/20">
                    <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Practice Exercises
                    </h3>
                    <div className="space-y-3">
                      {courseData.syllabus.chapters[activeChapter].exercises.map((exercise, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg">
                          <div className="w-6 h-6 rounded-full border border-green-500/50 flex items-center justify-center text-green-400 text-sm">
                            {index + 1}
                          </div>
                          <p className="text-slate-300">{exercise}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Map className="h-6 w-6" />
                    Course Mindmap
                  </h2>
                  <MindmapComponent mindmapData={courseData.mindmap} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;