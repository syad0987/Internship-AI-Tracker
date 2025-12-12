import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useJobs } from "./hooks/useJobs";
import SavedInternship from "./components/SavedInternships";
import JobCard from "./components/jobCard";
import AuthBar from "./components/AuthBar";

function App() {
  const [toast, setToast] = useState("");
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const [firebaseReady, setFirebaseReady] = useState(false);
  useEffect(() => {
    console.log("Firebase:", auth);
    setFirebaseReady(true);
  }, []);

  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState({
    role: "",
    location: "",
  });
  const { jobs, loading } = useJobs(submittedQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery({ role, location });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 overflow-x-hidden">
      {/*  Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-slate-700/50 supports-[backdrop-filter:blur()]:bg-slate-900/90">
        <div className="flex flex-wrap max-w-7xl mx-auto px-6 py-5 justify-between items-center">
          <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent hover:scale-105 hover:rotate-1 transition-all duration-500 ease-out group-hover:scale-110">
            AI Internship Tracker
            <span className="ml-2 inline-block transition-all duration-700 animate-pulse">
              {firebaseReady ? "✅" : "⏳"}
            </span>
          </h2>
          <AuthBar />
        </div>
      </nav>

      <main className="p-6 text-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <section className="py-6 sm:py-12 md:py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-indigo-900/80 to-slate-900/90 border border-slate-700/50 rounded-2xl shadow-2xl backdrop-blur-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/20 before:to-purple-500/20 before:rounded-2xl  sm:mx-4 max-w-7xl mx-auto">
            <div className="relative z-10 px-3 sm:px-6 lg:px-8 text-center border border-slate-600/50 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-4 sm:p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 rounded-2xl blur-xl animate-pulse"></div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-6 leading-tight bg-gradient-to-r from-slate-100 via-cyan-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl hover:scale-105 transition-transform duration-500 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
                Find Your Dream
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 text-transparent bg-clip-text drop-shadow-xl">
                  Internship
                </span>
              </h1>

              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-12 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed opacity-90 drop-shadow-sm">
                5000+ remote & onsite internships across 100+ companies. Save,
                track applications, and unlock powerful analytics.
              </p>

              <form
                className="flex flex-col gap-3 max-w-full sm:max-w-2xl md:max-w-4xl mx-auto group"
                onSubmit={handleSubmit}
                role="search"
                aria-label="Search internships"
              >
                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role (React, Frontend...)"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-600/50 bg-slate-800/80 shadow-xl backdrop-blur-sm
          focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 
          focus:shadow-2xl hover:border-slate-500/70 hover:shadow-xl
          transition-all duration-300 ease-out placeholder-slate-400
          text-sm sm:text-lg font-medium text-slate-200"
                />

                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location (Remote, Bangalore...)"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-600/50 bg-slate-800/80 shadow-xl backdrop-blur-sm
          focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/30 
          focus:shadow-2xl hover:border-slate-500/70 hover:shadow-xl
          transition-all duration-300 ease-out placeholder-slate-400
          text-sm sm:text-lg font-medium text-slate-200"
                  aria-label="Location"
                />

                <button
                  type="submit"
                  className="w-full px-6 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
          text-white font-black text-sm sm:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 
          focus:outline-none focus:ring-4 focus:ring-indigo-400/50
          transition-all duration-300 ease-out hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700
          backdrop-blur-sm border border-indigo-500/40"
                  aria-label="Search internships"
                >
                  🔍 Search Internships
                </button>
              </form>
            </div>
          </section>

          {/* Job Results */}

          <section className="py-16">
            <div className="space-y-6">
              {loading && (
                <div className="text-center py-20">
                  <div className="inline-block w-12 h-12 border-4 border-blue-500/30 border-t-blue-400 rounded-full animate-spin mb-4"></div>
                  <p className="text-xl text-slate-400 font-medium animate-pulse">
                    Searching internships...
                  </p>
                </div>
              )}
              {!loading && jobs.length === 0 && submittedQuery.role && (
                <div className="text-center py-20 bg-gradient-to-r from-slate-800/50 to-indigo-900/50 rounded-3xl p-12 border border-slate-700/50">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-slate-200 mb-4">
                    No internships found
                  </h3>
                  <p className="text-xl text-slate-400 max-w-md mx-auto">
                    Try different keywords or broaden your location search.
                  </p>
                </div>
              )}
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} showToast={showToast} />
              ))}
            </div>
          </section>

          {/* Saved Section */}
          <div className="mt-24 pt-12 border-t-8 border-gradient-to-r border-indigo-500/30 bg-gradient-to-br from-slate-800/70 via-indigo-900/60 to-slate-900/70 rounded-3xl p-12 shadow-2xl backdrop-blur-xl border  hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <SavedInternship showToast={showToast} />
          </div>

          {/* How It Works */}
          <section className="py-24 bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-3xl shadow-2xl border border-slate-700/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-black text-center text-slate-100 mb-4 bg-gradient-to-r from-slate-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                How It Works
              </h2>
              <p className="text-xl text-slate-400 text-center max-w-2xl mx-auto mb-20 opacity-90">
                Three simple steps to land your dream internship
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "🔍",
                    title: "Smart Search",
                    desc: "Find internships by skills, location, stipend, and company",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: "💾",
                    title: "Save & Track",
                    desc: "Save jobs, update status (applied, interview, offer)",
                    color: "from-emerald-500 to-teal-500",
                  },
                  {
                    icon: "📊",
                    title: "Analytics",
                    desc: "Track progress with remote/applied stats and insights",
                    color: "from-purple-500 to-pink-500",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="group text-center p-8 hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl rounded-3xl bg-slate-800/70 backdrop-blur-xl border border-slate-700/50 shadow-xl"
                  >
                    <div
                      className={`w-20 h-20 ${step.color} bg-gradient-to-r text-3xl rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                    >
                      <span>{step.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-100 group-hover:to-cyan-400 group-hover:bg-clip-text">
                      {step.title}
                    </h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 px-6 py-4 rounded-2xl bg-gradient-to-r from-slate-900/95 to-indigo-900/95 text-white text-base font-semibold shadow-2xl backdrop-blur-xl border border-slate-700/50 animate-in slide-in-from-bottom-4 duration-300 fade-in">
          <div className="flex items-center gap-3">
            <span className="text-lg">✅</span>
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
