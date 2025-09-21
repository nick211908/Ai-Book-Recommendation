import React, { useEffect, useRef } from 'react';

interface MindmapComponentProps {
  mindmapData: string;
}

const MindmapComponent: React.FC<MindmapComponentProps> = ({ mindmapData }) => {
  const mindmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMindmap = async () => {
      try {
        // For now, we'll show a placeholder since mermaid requires additional setup
        if (mindmapRef.current) {
          mindmapRef.current.innerHTML = `
            <div class="bg-slate-900/50 rounded-xl p-8 text-center border border-slate-700/30">
              <div class="mb-4">
                <svg class="w-16 h-16 mx-auto text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Interactive Mindmap</h3>
              <p class="text-slate-300 mb-4">This would render an interactive mindmap visualization of your course structure.</p>
              <div class="bg-slate-800/50 p-4 rounded-lg">
                <pre class="text-sm text-slate-400 text-left"><code>${mindmapData}</code></pre>
              </div>
              <p class="text-sm text-slate-400 mt-4">Mermaid.js integration would be implemented here for production use.</p>
            </div>
          `;
        }
      } catch (error) {
        console.error('Error rendering mindmap:', error);
      }
    };

    renderMindmap();
  }, [mindmapData]);

  return <div ref={mindmapRef} className="w-full h-96"></div>;
};

export default MindmapComponent;