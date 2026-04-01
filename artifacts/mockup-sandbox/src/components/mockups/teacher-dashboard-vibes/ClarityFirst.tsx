import React from "react";
import { BookOpen, AlertTriangle, TrendingUp } from "lucide-react";

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

export default function ClarityFirst() {
  const analytics = mockAnalytics;
  const totalAtRisk = analytics.classBreakdown.reduce((s, c) => s + c.atRiskCount, 0);

  return (
    <div className="min-h-screen bg-white font-['Inter'] text-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Primary section: The ONE thing that matters most */}
        <div className="mb-12">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">IMMEDIATE ACTION</div>
          {totalAtRisk > 0 ? (
            <div className="bg-red-50 border-4 border-red-600 rounded-lg p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-black text-red-900 mb-1">{totalAtRisk} Students Need Help</h2>
                  <p className="text-lg text-red-700">These students are at risk of memory loss. Review their progress immediately.</p>
                  <button className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-base transition-colors">
                    Review At-Risk Students
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border-4 border-green-600 rounded-lg p-8">
              <h2 className="text-3xl font-black text-green-900">All Students On Track</h2>
              <p className="text-lg text-green-700 mt-2">No immediate action needed.</p>
            </div>
          )}
        </div>

        {/* Secondary section: System Health */}
        <div className="mb-12">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">System Health</div>
          <div className="grid grid-cols-3 gap-6">
            <div className="border-4 border-slate-900 rounded-lg p-6">
              <div className="text-xs font-black uppercase tracking-widest text-slate-600 mb-2">Retention Rate</div>
              <div className="text-5xl font-black text-slate-900 mb-2">{(analytics.averageClassRetention * 100).toFixed(0)}%</div>
              <div className="text-sm text-slate-600">Network average</div>
            </div>
            <div className="border-4 border-slate-900 rounded-lg p-6">
              <div className="text-xs font-black uppercase tracking-widest text-slate-600 mb-2">Total Students</div>
              <div className="text-5xl font-black text-slate-900 mb-2">{analytics.totalStudents}</div>
              <div className="text-sm text-slate-600">Across {analytics.totalClasses} classes</div>
            </div>
            <div className="border-4 border-slate-900 rounded-lg p-6">
              <div className="text-xs font-black uppercase tracking-widest text-slate-600 mb-2">Active Cards</div>
              <div className="text-5xl font-black text-slate-900 mb-2">{analytics.totalCards}</div>
              <div className="text-sm text-slate-600">In circulation</div>
            </div>
          </div>
        </div>

        {/* Tertiary section: Class Details */}
        <div>
          <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Detailed Breakdown</div>
          <div className="space-y-4">
            {analytics.classBreakdown.map((cls) => (
              <div key={cls.classId} className="border-2 border-slate-300 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{cls.className}</h3>
                    <div className="text-sm text-slate-600 mt-1">
                      {cls.studentCount} students • {cls.totalReviews} reviews
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-600 uppercase">Retention</div>
                    <div className="text-3xl font-black text-slate-900">{(cls.averageRetention * 100).toFixed(0)}%</div>
                  </div>
                </div>
                {cls.atRiskCount > 0 && (
                  <div className="bg-red-100 border-2 border-red-400 rounded px-4 py-2 text-sm font-bold text-red-900">
                    ⚠️ {cls.atRiskCount} student{cls.atRiskCount !== 1 ? "s" : ""} at risk
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
