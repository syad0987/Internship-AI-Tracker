import { useEffect, useState } from "react";
import { auth } from "./firebase";

function App() {
  const [firebaseReady, setFirebaseReady] = useState(false);
  useEffect(() => {
    console.log("Firebase:", auth);
    setFirebaseReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-500 via-blue-50 to-indigo-500">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Internship Tracker {firebaseReady ? "✅" : "⏳"}
          </h2>
        </div>
      </nav>
      <main className="p-6 text-slate-700">
        <p className="text-lg">
          Firebase is {firebaseReady ? "connected!" : "initializing..."}
        </p>
      </main>
    </div>
  );
}

export default App;
