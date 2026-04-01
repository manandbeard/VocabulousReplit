import React, { useState } from "react";
import { BookOpen, Users, Brain, AlertTriangle, ChevronRight, Activity, Plus, Eye, Download } from "lucide-react";

const mockAnalytics = {
  totalClasses: 3,
  totalStudents: 47,
  totalCards: 892,
  averageClassRetention: 0.82,
  classBreakdown: [
    { classId: 1, className: "AP Biology Fall", studentCount: 18, averageRetention: 0.85, totalReviews: 1200, atRiskCount: 2 },
    { classId: 2, className: "Intro Chemistry", studentCount: 15, averageRetention: 0.79, totalReviews: 980, atRiskCount: 4 },
    { classId: 3, className: "Spanish II", studentCount: 14, averageRetention: 0.81, totalReviews: 750, atRiskCount: 1 }
  ]
};

export default function InteractionFirst() {
  const [hoveredClass, setHoveredClass] = useState<number | null>(null);
  const analytics = mockAnalytics;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 font-['Inter'] text-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with prominent action buttons */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">Teacher Dashboard</p>
            <h1 className="text-4xl font-bold text-slate-900">Welcome back, Dr. Smith</h1>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold transition-all shadow-lg hover:shadow-xl focus:ring-4 ring-blue-300">
              <Plus className="w-5 h-5" />
              New Class
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-900 font-bold transition-all focus:ring-4 ring-slate-300">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Key metrics with interactive cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <button className="group bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-indigo-600 hover:shadow-lg active:scale-95 transition-all focus:ring-4 ring-indigo-300 cursor-pointer">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-600 group-hover:text-indigo-600 transition-colors mb-2">
              Classes
            </div>
            <div className="text-4xl font-black text-slate-900 mb-2">{analytics.totalClasses}</div>
            <div className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">Click to manage</div>
          </button>

          <button className="group bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-cyan-600 hover:shadow-lg active:scale-95 transition-all focus:ring-4 ring-cyan-300 cursor-pointer">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-600 group-hover:text-cyan-600 transition-colors mb-2">
              Students
            </div>
            <div className="text-4xl font-black text-slate-900 mb-2">{analytics.totalStudents}</div>
            <div className="text-sm text-slate-600 group-hover:text-cyan-600 transition-colors">Click to enroll</div>
          </button>

          <button className="group bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-emerald-600 hover:shadow-lg active:scale-95 transition-all focus:ring-4 ring-emerald-300 cursor-pointer">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-600 group-hover:text-emerald-600 transition-colors mb-2">
              Cards
            </div>
            <div className="text-4xl font-black text-slate-900 mb-2">{analytics.totalCards}</div>
            <div className="text-sm text-slate-600 group-hover:text-emerald-600 transition-colors">Click to edit</div>
          </button>

          <button className="group bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 border-2 border-indigo-600 hover:border-indigo-700 hover:shadow-xl active:scale-95 transition-all focus:ring-4 ring-indigo-300 cursor-pointer text-white">
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">Retention</div>
            <div className="text-4xl font-black text-white mb-2">{(analytics.averageClassRetention * 100).toFixed(0)}%</div>
            <div className="text-sm text-indigo-100">Click for trends</div>
          </button>
        </div>

        {/* Class cards with obvious interaction states */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">Classes — Click to manage</p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {analytics.classBreakdown.map((cls) => (
              <button
                key={cls.classId}
                onMouseEnter={() => setHoveredClass(cls.classId)}
                onMouseLeave={() => setHoveredClass(null)}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-indigo-600 hover:shadow-xl active:scale-95 transition-all text-left focus:ring-4 ring-indigo-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{cls.className}</h3>
                    <p className="text-sm text-slate-600 mt-1">{cls.studentCount} students enrolled</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-slate-200">
                  <div>
                    <div className="text-xs text-slate-600 font-semibold mb-1">Retention</div>
                    <div className="text-2xl font-black text-indigo-600">{(cls.averageRetention * 100).toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-semibold mb-1">Reviews</div>
                    <div className="text-2xl font-black text-slate-900">{cls.totalReviews}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-semibold mb-1">Status</div>
                    <div className={`text-2xl font-black ${cls.atRiskCount > 0 ? "text-red-600" : "text-green-600"}`}>
                      {cls.atRiskCount > 0 ? "⚠️" : "✓"}
                    </div>
                  </div>
                </div>

                {hoveredClass === cls.classId && (
                  <div className="flex gap-2 mt-4 animate-in fade-in duration-200">
                    <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                      <Users className="w-4 h-4" /> Manage
                    </button>
                  </div>
                )}

                {cls.atRiskCount > 0 && (
                  <div className="mt-4 px-3 py-2 bg-red-50 border-2 border-red-200 rounded-lg">
                    <div className="text-xs font-bold text-red-700">🚨 {cls.atRiskCount} at risk — Click to review</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
