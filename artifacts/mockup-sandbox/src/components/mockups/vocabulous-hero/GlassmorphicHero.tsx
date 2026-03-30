export function GlassmorphicHero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-slate-900 font-['Inter'] relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>

      <div className="relative max-w-5xl mx-auto px-8 py-28 flex flex-col items-center text-center">
        {/* Glassmorphic badge */}
        <div className="mb-8 px-6 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/20 text-sm font-semibold text-slate-700">
          🧠 Cognitive Science × AI
        </div>

        {/* Hero headline */}
        <h1 className="text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Learning That Sticks
        </h1>

        <p className="text-xl text-slate-700 max-w-2xl mb-12 leading-relaxed">
          Break the forgetting cycle. With spacing effects and retrieval practice powered by AI, vocabulary mastery becomes automatic.
        </p>

        {/* Glassmorphic CTA */}
        <div className="flex gap-4 mb-20">
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-200 transition-all backdrop-blur-md">
            Get Started Free
          </button>
          <button className="px-8 py-3 rounded-lg bg-white/30 backdrop-blur-md border border-white/20 text-slate-700 font-semibold hover:bg-white/50 transition-all">
            Watch Demo
          </button>
        </div>

        {/* Glassmorphic stats */}
        <div className="grid grid-cols-3 gap-6 w-full">
          {[
            { value: "87%", label: "Retention Rate", icon: "📈" },
            { value: "94%", label: "Daily Engagement", icon: "🎯" },
            { value: "<200ms", label: "Response Time", icon: "⚡" },
          ].map((stat) => (
            <div key={stat.label} className="px-6 py-8 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 hover:bg-white/30 transition-all">
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
              <p className="text-sm text-slate-700">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Three pillars in glassmorphic cards */}
        <div className="mt-24 w-full">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest mb-8">How It Works</p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: "Spacing", desc: "Short, distributed sessions optimize memory consolidation." },
              { title: "Retrieval", desc: "Active recall strengthens neural pathways and recall ability." },
              { title: "Difficulty", desc: "AI targets 60-80% recall for maximum learning gains." },
            ].map((pillar) => (
              <div key={pillar.title} className="px-6 py-8 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                <h3 className="font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
