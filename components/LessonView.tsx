import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen, RefreshCw, Terminal } from 'lucide-react';

interface LessonViewProps {
  content: string;
  isGenerating: boolean;
  onRestart: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ content, isGenerating, onRestart }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for smooth reading experience during generation
  useEffect(() => {
    if (isGenerating && bottomRef.current) {
        // Only auto-scroll if user is near bottom to avoid annoying jumps
        const threshold = 200;
        const element = bottomRef.current;
        const parent = element.parentElement;
        if(parent) {
             const distanceFromBottom = parent.scrollHeight - parent.scrollTop - parent.clientHeight;
             if(distanceFromBottom < threshold) {
                 element.scrollIntoView({ behavior: 'smooth' });
             }
        }
    }
  }, [content, isGenerating]);

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">AI in Algorithmic Trading</h2>
            <p className="text-xs text-slate-400">
               {isGenerating ? 'Generating curriculum...' : 'Lesson Complete'}
            </p>
          </div>
        </div>
        
        {isGenerating ? (
           <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded-full border border-blue-500/20 animate-pulse">
             <Terminal className="w-3 h-3" />
             <span>STREAMING_DATA...</span>
           </div>
        ) : (
          <button 
            onClick={onRestart}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over
          </button>
        )}
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth">
        <article className="prose prose-invert prose-slate max-w-none prose-headings:font-sans prose-headings:tracking-tight prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom components for specific markdown elements to enhance the "tech" feel
              h1: ({node, ...props}) => <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-8" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-800 pb-2 mt-12 mb-6" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-emerald-400 mt-8 mb-4" {...props} />,
              code({node, inline, className, children, ...props}: any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline ? (
                  <div className="relative group">
                    <div className="absolute -top-3 right-4 text-xs font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {match ? match[1] : 'ASCII'}
                    </div>
                    <code className={`${className} block bg-slate-900/50 p-6 rounded-xl border border-slate-800 text-sm font-mono text-blue-200 overflow-x-auto shadow-inner my-6`} {...props}>
                      {children}
                    </code>
                  </div>
                ) : (
                  <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-emerald-200 border border-slate-700" {...props}>
                    {children}
                  </code>
                )
              },
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 my-6 bg-emerald-900/10 italic text-slate-300 rounded-r-lg" {...props} />
              ),
              ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 space-y-2 text-slate-300" {...props} />,
              li: ({node, ...props}) => <li className="pl-2 marker:text-emerald-500" {...props} />,
              table: ({node, ...props}) => <div className="overflow-x-auto my-8 border border-slate-800 rounded-lg"><table className="w-full text-left text-sm" {...props} /></div>,
              th: ({node, ...props}) => <th className="bg-slate-900 p-4 font-semibold text-slate-200 border-b border-slate-800" {...props} />,
              td: ({node, ...props}) => <td className="p-4 border-b border-slate-800/50 text-slate-400" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>

          {/* Loading Indicator at bottom when generating */}
          {isGenerating && (
             <div className="mt-8 flex items-center gap-2 text-slate-500 animate-pulse">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span className="font-mono text-sm">Processing next token...</span>
             </div>
          )}
          
          <div ref={bottomRef} className="h-4" />
        </article>
      </main>
    </div>
  );
};

export default LessonView;
