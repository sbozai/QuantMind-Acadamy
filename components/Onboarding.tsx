import React, { useState } from 'react';
import { MathLevel, CodingLevel, UserContext } from '../types';
import { BrainCircuit, Calculator, Code2, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (context: UserContext) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [mathLevel, setMathLevel] = useState<MathLevel>(MathLevel.BEGINNER);
  const [codingLevel, setCodingLevel] = useState<CodingLevel>(CodingLevel.NONE);
  const [specificInterest, setSpecificInterest] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ mathLevel, codingLevel, specificInterest });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-xl mb-4">
          <BrainCircuit className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 tracking-tight">
          QuantMind Academy
        </h1>
        <p className="text-slate-400 text-lg">
          Before we begin the deep dive (approx. 2,000 words), help me tailor the curriculum to your background.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm">
        
        {/* Math Level */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-slate-200 font-semibold text-lg">
            <Calculator className="w-5 h-5 text-blue-400" />
            Math Comfort Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.values(MathLevel).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setMathLevel(level)}
                className={`p-4 rounded-lg border text-left text-sm transition-all duration-200 ${
                  mathLevel === level
                    ? 'bg-blue-500/10 border-blue-500 text-blue-100 ring-1 ring-blue-500'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Coding Level */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-slate-200 font-semibold text-lg">
            <Code2 className="w-5 h-5 text-purple-400" />
            Coding Experience
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.values(CodingLevel).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setCodingLevel(level)}
                className={`p-4 rounded-lg border text-left text-sm transition-all duration-200 ${
                  codingLevel === level
                    ? 'bg-purple-500/10 border-purple-500 text-purple-100 ring-1 ring-purple-500'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Specific Interest */}
        <div className="space-y-4">
          <label className="block text-slate-200 font-semibold text-lg">
            Specific Focus (Optional)
          </label>
          <input
            type="text"
            value={specificInterest}
            onChange={(e) => setSpecificInterest(e.target.value)}
            placeholder="e.g., Sentiment Analysis, High Frequency Trading..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full group relative flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]"
        >
          <span>Start Lesson</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
