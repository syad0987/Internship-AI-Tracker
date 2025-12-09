import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useJobs } from "./hooks/useJobs";
import SavedInternship from "./components/SavedInternships";
import JobCard from "./components/jobCard";
import AuthBar from "./components/AuthBar";

// import { fromJSON } from "postcss";
function App() {
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Search Internship
          </h2>
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
              <JobCard key={job.id} job={job}></JobCard>
            ))}
          </div>
          <div className="mt-20 pt-10 border-t-4 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-2xl">
            <SavedInternship />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
