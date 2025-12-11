import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useJobs } from "./hooks/useJobs";
import SavedInternship from "./components/SavedInternships";
import JobCard from "./components/jobCard";
import AuthBar from "./components/AuthBar";

// import { fromJSON } from "postcss";
function App() {
  const [toast, setToast] = useState("");
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-500 via-blue-50 to-indigo-500">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="flex flex-wrap max-w-7xl mx-auto px-6 py-4 justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Internship Tracker {firebaseReady ? "✅" : "⏳"}
          </h2>
          <AuthBar />
        </div>
      </nav>
      <main className="p-6 text-slate-700">
        <div className="max-w-4xl mx-auto px-6   py-10 ">
          <section
            className="py-20 bg-gradient-to-r from-slate-50 to-slate-50 text-center
          "
          >
            <div className="max-w-4xl mx-auto px-4">
              <h1>Find your next internship</h1>
              <p>
                5000+ remot & onsite internship. Save, track applications, and
                get analytics.
              </p>
              <form
                action=""
                className="flex flex-col md:flex-row gap-4 mb-8"
                onSubmit={handleSubmit}
              >
                <input
                  type="text "
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role (e.g. React, Frontent)"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-500 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="location (Remote, Banglore...)"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold 
              shadow-lg hover:scale-105 transition "
                >
                  Search
                </button>
              </form>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
                How it works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Search
                  </h3>
                  <p className="text-slate-600">
                    Find internships by skills, location, stipend.
                  </p>
                </div>
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">💾</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Save & Track
                  </h3>
                  <p className="text-slate-600">
                    Save jobs, update status (applied, interview).
                  </p>
                </div>
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Analytics
                  </h3>
                  <p className="text-slate-600">
                    See your progress with remote/applied stats.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* render cards */}
          <div className="space-y-4">
            {loading && (
              <p className="text-slate-500">Searching interships...</p>
            )}
            {!loading && jobs.length === 0 && submittedQuery.role && (
              <p className="text-slate-500">
                No internships found. Try another role or location.
              </p>
            )}
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} showToast={showToast}></JobCard>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t-4 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-2xl">
            <SavedInternship showToast={showToast} />
          </div>
        </div>
      </main>
      {toast && (
        <div className="fixed bottom-4 right-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
