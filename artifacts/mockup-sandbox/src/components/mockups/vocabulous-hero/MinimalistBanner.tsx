import { SynapticWeb } from "../synaptic-web/SynapticWeb";

export function MinimalistBanner() {
  return (
    <div className="h-80 text-slate-900 font-['Inter'] relative overflow-hidden">
      <SynapticWeb />
      <div className="max-w-6xl mx-auto px-8 py-8 relative z-10 h-full flex items-center">
        <div className="w-full">
          <p className="text-slate-700 uppercase tracking-widest mb-4 text-sm font-bold">Vocabulous²</p>
          
          <h2 className="text-5xl font-light leading-tight mb-6 max-w-3xl">
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold">
              Master any subject
            </span>
            <br />
            with science-backed learning
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mb-8 leading-relaxed font-light">
            70% of knowledge is lost in 24 hours without reinforcement. Vocabulous uses spacing effects and adaptive difficulty to lock concepts into long-term memory.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">
              Start Learning Free
            </button>
            <button className="px-8 py-3 rounded-lg bg-slate-200 text-slate-900 font-medium hover:bg-slate-300 transition-colors">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
