import React, { useState, useCallback } from 'react';
import { UserContext, AppState } from './types';
import Onboarding from './components/Onboarding';
import LessonView from './components/LessonView';
import { streamLessonContent } from './services/geminiService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ONBOARDING);
  const [content, setContent] = useState<string>('');
  
  const handleOnboardingComplete = useCallback(async (context: UserContext) => {
    setAppState(AppState.GENERATING);
    setContent(''); // Reset content
    
    await streamLessonContent(context, (chunk) => {
      // Functional update to ensure we don't lose previous chunks
      setContent(prev => prev + chunk);
    });

    setAppState(AppState.READING);
  }, []);

  const handleRestart = useCallback(() => {
    setAppState(AppState.ONBOARDING);
    setContent('');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-100 font-sans">
      {appState === AppState.ONBOARDING && (
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px]" />
            </div>
            
            <div className="relative z-10 w-full">
                <Onboarding onComplete={handleOnboardingComplete} />
            </div>
        </div>
      )}

      {(appState === AppState.GENERATING || appState === AppState.READING) && (
        <LessonView 
            content={content} 
            isGenerating={appState === AppState.GENERATING}
            onRestart={handleRestart}
        />
      )}
      
      {/* Fallback loader if state gets stuck or initiating */}
      {appState === AppState.GENERATING && content.length === 0 && (
         <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <p className="text-slate-300 font-mono animate-pulse">Initializing Neural Network...</p>
         </div>
      )}
    </div>
  );
};

export default App;
