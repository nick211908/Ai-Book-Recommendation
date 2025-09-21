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
                <Brain className="h-4 w-4 mr-2" />                 दुनिया भर में 30,000+ उपयोगकर्ताओं द्वारा भरोसा किया               </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">                   एआई कोर्स-बुक                   <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">                     सरल बनाया हुआ                   </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">                   एआई सहायता के साथ व्यापक पाठ्यक्रम पुस्तकें उत्पन्न करें और 
                  बुद्धिमान सामग्री निर्माण। पेशेवर शिक्षण सामग्री प्राप्त करें 
                  तुरंत, जटिलता या लागत के बिना।                 </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">अपनी पाठ्यक्रम पुस्तक उत्पन्न करें</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">                       पाठ्यक्रम विषय                     </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="जैसे, मशीन लर्निंग, वेब डेवलपमेंट"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">                       कठिनाई स्तर                     </label>
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
                          <Brain className="h-5 w-5" />                           सृजित पाठ्यक्रम                         </>
                      )}
                    </button>
                    
                    <button className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2">
                      <FileText className="h-5 w-5" />                       पूर्वावलोकन नमूना                     </button>
                  </div>
                </div>
                
                <div className="flex items-center mt-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-sm text-slate-300 ml-2">2,000+ समीक्षाओं से 4.9</span>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="एआई सीखना" 
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
                
                {/* AI Assistant Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white font-semibold">एआई सहायक दौड़</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">                     मुझे एक रोजगार अनुबंध में क्या देखना चाहिए?                   </p>
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-3 border border-blue-500/30">
                    <p className="text-blue-200 text-sm">                       मैं प्रमुख शर्तों का विश्लेषण करूंगा और रोजगार कानून, अनुबंध खंड और बातचीत की रणनीतियों को कवर करने वाले व्यापक पाठ्यक्रम सामग्री बनाऊंगा ...                     </p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">               अपनी उंगलियों पर शक्तिशाली शिक्षण उपकरण             </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">               एआई-संचालित पाठ्यक्रम पीढ़ी समाधान के हमारे व्यापक सूट से चुनें 
              सभी के लिए डिज़ाइन किया गया।             </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">एआई सहायक दौड़</h3>
              <p className="text-slate-300 mb-4">                 हमारे उन्नत एआई के साथ सीखने के सवालों के तुरंत उत्तर प्राप्त करें 
                चैटबॉट व्यापक शैक्षिक डेटाबेस और केस स्टडी पर प्रशिक्षित।               </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   24/7 उपलब्धता                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   त्वरित प्रतिक्रियाएँ                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   कानूनी मामले की समीक्षा की गई                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   समझने में आसान                 </div>
              </div>
              <button className="mt-6 text-blue-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">                 अब इसे आजमाओ <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">पीडीएफ कोर्स बुक्स</h3>
              <p className="text-slate-300 mb-4">                 संभावित मुद्दों के लिए दस्तावेजों को अपलोड और विश्लेषण करें, गायब 
                खंड, अनुपालन और सुधार सिफारिशें।               </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   जोखिम आकलन                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   खंड विश्लेषण                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   अनुपालन जाँच                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   सुधार सुझाव                 </div>
              </div>
              <button className="mt-6 text-cyan-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">                 अब इसे आजमाओ <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">उन्नत पाठ्यक्रम विश्लेषण</h3>
              <p className="text-slate-300 mb-4">                 सटीकता के साथ पाठ्यक्रम दस्तावेजों का विश्लेषण करने के लिए एआई की शक्ति का उपयोग करें 
                और सटीकता। संभावित मुद्दों की पहचान करना और प्रदान करना 
                कार्रवाई योग्य सिफारिशें।               </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   सामग्री जोखिम मूल्यांकन                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   पाठ्यक्रम अनुसंधान सहायक                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   दस्तावेज़ संक्षेपण                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>                   सुधार सुझाव                 </div>
              </div>
              <button className="mt-6 text-purple-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">                 अब इसे आजमाओ <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">             दुनिया भर में पेशेवरों द्वारा भरोसा किया           </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">             देखें कि हमारे उपयोगकर्ता एआई कोर्सबुक के साथ अपने अनुभव के बारे में क्या कहते हैं           </p>

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
                सामग्री: "As a Recent convert, this platform saves me hours of legal contract reading. The AI provides accurate clause breakdowns complete within hours or day.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Startup Founder",
                company: "TechStart Inc",
                सामग्री: "Before signing any client contracts, I run it through CourseBook AI to spot red flags. My legal expenses have significantly decreased since I started."
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
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">             अपने लर्निंग वर्कफ़्लो को बदलने के लिए तैयार हैं?           </h2>
          <p className="text-xl text-slate-300 mb-8">             हजारों पेशेवरों में शामिल हों जो अपने सीखने के लिए कोर्सबुक एआई पर भरोसा करते हैं 
            प्रौद्योगिकी की जरूरत है।           </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">               लाइव कोर्सबुक आज़माएं             </button>
            <button className="bg-slate-700/50 hover:bg-slate-600/50 text-white px-8 py-4 rounded-lg font-semibold text-lg border border-slate-600 hover:border-slate-500 transition-all duration-200">               मेरे अनुबंध की जाँच करें             </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;