import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("✅ Day 1: React + Tailwind + Git ready!");
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-500 text-white text-4xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Internship Tracker
          </h2>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Find Your Dream Internship
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AI matches jobs to your Dashly skills. Real-time tracking + resume
            optimizer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              AI Match
            </div>
            <div className="text-3xl font-bold text-slate-800">95%</div>
          </div>
          <div className="p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <div className="text-4xl font-bold text-green-600 mb-2">Apps</div>
            <div className="text-3xl font-bold text-slate-800">127</div>
          </div>
          <div className="p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              Interviews
            </div>
            <div className="text-3xl font-bold text-slate-800">8</div>
          </div>
        </div>

        <div className="text-center">
          <button className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all">
            Start Matching →
          </button>
          <p className="text-sm text-slate-500 mt-4 font-mono">
            Day 1 Complete ✅
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
