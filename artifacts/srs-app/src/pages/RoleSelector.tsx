import { useState } from "react";
import { useLocation } from "wouter";
import { GraduationCap, Users, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { SynapticWeb } from "@/components/ui/synaptic-web";
import { useRole } from "@/hooks/use-role";
import { useUser } from "@clerk/react";

export default function RoleSelector() {
  const [, navigate] = useLocation();
  const { setRole } = useRole();
  const { user } = useUser();
  const [selected, setSelected] = useState<"teacher" | "student" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await setRole(selected);
      navigate(selected === "teacher" ? "/teacher" : "/student");
    } catch {
      setLoading(false);
    }
  };

  const firstName = user?.firstName ?? "there";

  return (
    <div className="min-h-screen font-['Inter'] flex items-center justify-center relative">
      <SynapticWeb />

      <div className="w-full max-w-lg mx-auto px-4 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Vocabulous²</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.12)] p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
              Welcome, {firstName}!
            </h1>
            <p className="text-sm text-slate-500">
              How will you be using Vocabulous²?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Student card */}
            <button
              type="button"
              onClick={() => setSelected("student")}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-200 group ${
                selected === "student"
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40"
              }`}
            >
              {selected === "student" && (
                <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-blue-500" />
              )}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                selected === "student" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-500"
              }`}>
                <Users className="w-6 h-6" />
              </div>
              <h3 className={`font-bold text-base mb-1 transition-colors ${
                selected === "student" ? "text-blue-700" : "text-slate-800"
              }`}>
                Student
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Study vocabulary, track your progress, and master new material.
              </p>
            </button>

            {/* Teacher card */}
            <button
              type="button"
              onClick={() => setSelected("teacher")}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-200 group ${
                selected === "teacher"
                  ? "border-violet-500 bg-violet-50"
                  : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/40"
              }`}
            >
              {selected === "teacher" && (
                <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-violet-500" />
              )}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                selected === "teacher" ? "bg-violet-100 text-violet-600" : "bg-slate-100 text-slate-500 group-hover:bg-violet-50 group-hover:text-violet-500"
              }`}>
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className={`font-bold text-base mb-1 transition-colors ${
                selected === "teacher" ? "text-violet-700" : "text-slate-800"
              }`}>
                Teacher
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Create classes, build decks, and track your students' progress.
              </p>
            </button>
          </div>

          <button
            onClick={handleContinue}
            disabled={!selected || loading}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Setting up your account…
              </>
            ) : (
              <>
                Continue as {selected === "teacher" ? "Teacher" : selected === "student" ? "Student" : "…"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
