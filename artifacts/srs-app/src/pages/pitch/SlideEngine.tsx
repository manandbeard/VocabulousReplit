import { useState } from "react";

export default function SlideEngine() {
  const [flowState, setFlowState] = useState<'idle' | 'api' | 'engine'>('idle');
  const [recallProb, setRecallProb] = useState(45);

  const simulateFlow = (isCorrect: boolean) => {
    setFlowState('api');
    setTimeout(() => setFlowState('engine'), 800);
    setTimeout(() => {
      setRecallProb((prev) => (isCorrect ? Math.min(prev + 20, 95) : Math.max(prev - 15, 12)));
      setFlowState('idle');
    }, 1600);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center px-8 font-['Inter']">
      <style>{`
        @keyframes flow-in {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
        }
        .flow-active { animation: flow-in 0.6s ease-out; }
        .engine-active { animation: pulse-glow 1s ease-out; }
      `}</style>

      <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-6xl font-light text-slate-900 mb-4 tracking-wide">
          Meta-Learned Spaced Retrieval
        </h2>
        <p className="text-lg font-light text-slate-600 leading-relaxed mb-16 max-w-4xl">
          A Python-based adaptive scheduler that predicts recall. It targets a 60-80% "desirable difficulty" recall probability, surfacing words from The Crucible automatically during the Fahrenheit 451 unit.
        </p>

        {/* Interactive Flow Visualization */}
        <div className="mt-12">
          {/* Data Flow */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {/* Input Box */}
            <div className={`text-center ${flowState === 'api' ? 'flow-active' : ''}`}>
              <div className="w-24 h-20 rounded-lg border-2 border-slate-300 flex items-center justify-center bg-slate-50">
                <span className="text-xs font-semibold text-slate-700">recordReview()</span>
              </div>
            </div>

            {/* Arrow */}
            <div className={`text-slate-300 transition-colors ${flowState !== 'idle' ? 'text-blue-400' : ''}`}>→</div>

            {/* Engine Box */}
            <div className={`text-center ${flowState === 'engine' ? 'engine-active' : ''}`}>
              <div className={`w-28 h-20 rounded-lg border-2 flex items-center justify-center transition-all ${
                flowState === 'engine' 
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' 
                  : 'border-slate-300 bg-slate-50'
              }`}>
                <span className="text-xs font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  scheduler
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div className={`text-slate-300 transition-colors ${flowState === 'engine' ? 'text-purple-400' : ''}`}>→</div>

            {/* Output Box */}
            <div className={`text-center ${flowState === 'engine' ? 'flow-active' : ''}`}>
              <div className="w-28 h-20 rounded-lg border-2 border-slate-300 flex items-center justify-center bg-blue-50">
                <span className="text-xs font-semibold text-blue-700">next interval</span>
              </div>
            </div>
          </div>

          {/* Recall Probability Display */}
          <div className="flex justify-center mb-12">
            <div className="text-center">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-2">Recall Probability</p>
              <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                  style={{ width: `${recallProb}%` }}
                />
              </div>
              <p className="text-2xl font-light text-slate-900 mt-3">{recallProb}%</p>
              <p className="text-xs text-slate-500 mt-1">Target: 60–80% desirable difficulty</p>
            </div>
          </div>

          {/* Interactive Buttons */}
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => simulateFlow(true)}
              disabled={flowState !== 'idle'}
              className="px-8 py-3 rounded-lg bg-green-50 border-2 border-green-300 text-green-700 font-semibold hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✓ Correct
            </button>
            <button
              onClick={() => simulateFlow(false)}
              disabled={flowState !== 'idle'}
              className="px-8 py-3 rounded-lg bg-red-50 border-2 border-red-300 text-red-700 font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✗ Incorrect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
