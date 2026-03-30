import { SynapticWeb } from "./SynapticWeb";

export function SynapticWebDemo() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-['Inter']">
      <SynapticWeb />

      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-32">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
            Learning Connections
          </p>
          <h1 className="text-5xl font-light leading-tight text-slate-900 mb-6">
            The Synaptic Web
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-light">
            Every time you learn something new, your brain forms synaptic connections. Move your cursor to see the subtle interactions between neurons as they form, strengthen, and fade.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-12 text-left">
          {[
            {
              title: "Formation",
              description: "Connections draw themselves slowly over 2 seconds, representing neural pathway creation.",
            },
            {
              title: "Consolidation",
              description: "Connections hold for 5 seconds, symbolizing memory consolidation through repetition.",
            },
            {
              title: "Integration",
              description: "Connections fade gracefully, merging into long-term knowledge as they fade away.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-semibold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-12 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center">
            The animation you see reflects how spaced retrieval creates lasting memories through repeated, distributed practice.
          </p>
        </div>
      </div>
    </div>
  );
}
