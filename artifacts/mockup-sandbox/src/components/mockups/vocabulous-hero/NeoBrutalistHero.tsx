export function NeoBrutalistHero() {
  return (
    <div className="min-h-screen bg-white text-black font-['Space_Grotesk']">
      {/* Top magenta bar */}
      <div className="h-4 bg-magenta-600" style={{backgroundColor: '#FF00AA'}}></div>

      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Badge */}
        <div className="mb-12">
          <div className="inline-block border-4 border-black bg-yellow-300 px-6 py-3 font-black text-xs">
            DEFYING FORGETTING
          </div>
        </div>

        {/* Main headline with yellow accent */}
        <div className="mb-12">
          <h1 className="text-7xl font-black leading-tight mb-6 uppercase">
            VOCABULOUS
            <br />
            <span className="border-4 border-black bg-yellow-300 px-3 py-2" style={{display: 'inline-block', marginTop: '12px'}}>
              LEARNING ENGINEERED
            </span>
          </h1>
          <p className="text-lg font-bold mt-8 max-w-2xl">
            70% forgotten in 24 hours. This is the forgetting curve problem. We're solving it with science, not hype.
          </p>
        </div>

        {/* Harsh border CTA section */}
        <div className="border-4 border-black bg-gray-100 p-8 mb-16">
          <h2 className="text-3xl font-black mb-6 uppercase">How It Works</h2>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { title: "SPACING", desc: "Break learning into short bursts. Repeat at scientifically optimal intervals." },
              { title: "RETRIEVAL", desc: "Force the brain to reach for info. This strengthens neural pathways permanently." },
              { title: "DIFFICULTY", desc: "AI targets 60-80% recall probability. Not too easy, not too hard." },
            ].map((item) => (
              <div key={item.title} className="border-4 border-black p-4">
                <h3 className="font-black text-lg mb-2 uppercase">{item.title}</h3>
                <p className="text-sm font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons with harsh shadows */}
        <div className="flex gap-6 mb-20">
          <button className="border-4 border-black bg-yellow-300 px-8 py-4 font-black text-lg hover:translate-x-1 hover:translate-y-1 transition-transform" style={{boxShadow: '6px 6px 0 black'}}>
            START FREE
          </button>
          <button className="border-4 border-black bg-white px-8 py-4 font-black text-lg hover:translate-x-1 hover:translate-y-1 transition-transform" style={{boxShadow: '6px 6px 0 black'}}>
            VIEW DEMO
          </button>
        </div>

        {/* Impact metrics in brutal cards */}
        <div>
          <h3 className="text-2xl font-black mb-6 uppercase">Impact by the Numbers</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { metric: "87%", label: "Retention Rate", color: "bg-yellow-300" },
              { metric: "94%", label: "Engagement", color: "bg-magenta-200" },
              { metric: "<200ms", label: "Latency", color: "bg-cyan-200" },
              { metric: "∞", label: "Never Forget", color: "bg-lime-300" },
            ].map((item) => (
              <div key={item.label} className={`${item.color} border-4 border-black p-6`}>
                <p className="text-4xl font-black mb-2">{item.metric}</p>
                <p className="font-black text-xs uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
