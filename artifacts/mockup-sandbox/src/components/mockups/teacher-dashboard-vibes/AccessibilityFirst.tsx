import React from "react";
import { AlertTriangle, TrendingUp, Users, BookOpen } from "lucide-react";

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

export default function AccessibilityFirst() {
  const analytics = mockAnalytics;

  return (
    <div className="min-h-screen bg-white font-['Inter'] text-black p-6">
      <div className="max-w-5xl mx-auto">
        {/* Skip to main content */}
        <a href="#main" className="sr-only focus:not-sr-only focus:block focus:bg-yellow-300 focus:text-black focus:font-bold focus:p-2 focus:mb-4">
          Skip to main content
        </a>

        {/* Page header */}
        <header className="mb-8">
          <h1 className="text-5xl font-black text-black mb-2">Teacher Dashboard</h1>
          <p className="text-2xl text-black font-bold mb-4">Welcome, Dr. Smith</p>
          <p className="text-lg text-black">This dashboard shows your class performance and student progress.</p>
        </header>

        {/* High contrast alert section */}
        <section className="mb-8" aria-label="Immediate action required">
          <h2 className="text-3xl font-black text-black mb-4">⚠️ Attention Required</h2>
          <div className="bg-yellow-300 border-4 border-black rounded-xl p-6">
            <h3 className="text-2xl font-black text-black mb-3">7 Students at Risk</h3>
            <p className="text-lg font-bold text-black mb-4">These students are losing memory. They need review immediately.</p>
            <ul className="text-lg font-bold text-black space-y-2 mb-6">
              <li>• AP Biology Fall: 2 students</li>
              <li>• Intro Chemistry: 4 students</li>
              <li>• Spanish II: 1 student</li>
            </ul>
            <button className="bg-black text-yellow-300 px-6 py-4 font-black text-lg rounded-lg border-4 border-black hover:bg-yellow-300 hover:text-black transition-colors focus:outline-4 focus:outline-black focus:outline-offset-2">
              REVIEW AT-RISK STUDENTS
            </button>
          </div>
        </section>

        {/* Key metrics in high contrast */}
        <section className="mb-8" aria-label="System metrics">
          <h2 className="text-3xl font-black text-black mb-4">System Metrics</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: "Network Retention Rate", value: `${(analytics.averageClassRetention * 100).toFixed(0)}%`, desc: "How well students remember cards on average" },
              { label: "Total Students Enrolled", value: analytics.totalStudents.toString(), desc: "Across all classes" },
              { label: "Total Flashcards Created", value: analytics.totalCards.toString(), desc: "Currently in circulation" },
              { label: "Total Classes Managed", value: analytics.totalClasses.toString(), desc: "Active classes with students" }
            ].map((metric, i) => (
              <div key={i} className="bg-white border-4 border-black rounded-xl p-6">
                <h3 className="text-2xl font-black text-black mb-2">{metric.label}</h3>
                <div className="text-5xl font-black text-black mb-2">{metric.value}</div>
                <p className="text-lg text-black font-bold">{metric.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Class breakdown in high contrast tables */}
        <section aria-label="Class details">
          <h2 className="text-3xl font-black text-black mb-4">Class Breakdown</h2>
          <div className="space-y-6">
            {analytics.classBreakdown.map((cls) => (
              <div key={cls.classId} className="border-4 border-black rounded-xl p-6">
                <h3 className="text-2xl font-black text-black mb-4">{cls.className}</h3>

                {/* Table with high contrast */}
                <table className="w-full border-collapse">
                  <tbody className="text-lg font-bold">
                    <tr className="bg-black text-yellow-300">
                      <td className="border-2 border-black p-3">Metric</td>
                      <td className="border-2 border-black p-3">Value</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-black p-3 text-black">Students Enrolled</td>
                      <td className="border-2 border-black p-3 text-black">{cls.studentCount}</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="border-2 border-black p-3 text-black">Total Reviews Completed</td>
                      <td className="border-2 border-black p-3 text-black">{cls.totalReviews}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-black p-3 text-black">Memory Retention Rate</td>
                      <td className="border-2 border-black p-3 text-black font-black text-lg">{(cls.averageRetention * 100).toFixed(1)}%</td>
                    </tr>
                    <tr className={cls.atRiskCount > 0 ? "bg-red-300" : "bg-green-300"}>
                      <td className="border-2 border-black p-3 text-black font-black">At-Risk Students</td>
                      <td className="border-2 border-black p-3 text-black font-black text-lg">{cls.atRiskCount > 0 ? `${cls.atRiskCount} ⚠️` : "None ✓"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        {/* Keyboard navigation hint */}
        <footer className="mt-8 p-4 border-4 border-black rounded-lg bg-gray-100">
          <p className="text-lg font-bold text-black">
            💡 Tip: Use <kbd className="bg-black text-white px-2 py-1 rounded font-black">Tab</kbd> to navigate, <kbd className="bg-black text-white px-2 py-1 rounded font-black">Enter</kbd> to activate buttons
          </p>
        </footer>
      </div>
    </div>
  );
}
