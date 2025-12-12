import { useState, useEffect } from "react";
import { auth } from "./../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
export default function AuthBar() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const user = auth.currentUser;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleAuth = async (mode) => {
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error("Auth error", e.message);
    }
  };

  const handleLogout = () => signOut(auth);

  if (user) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span
          className="text-slate-900 text-sm border border-slate-500 px-3 py-1 rounded-full  text-3xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent text-shadow-md  hover:scale-105 hover:bg-emerald-800-900 active:scale-95 
  transition transform duration-150 "
        >
          Hi, {user.email?.split("@")[0]}!
        </span>
        <button
          onClick={handleLogout}
          className=" px-3 py-1 rounded-full border border-slate-500    font-bold bg-gradient-to-r from-red-800 to-red-400 bg-clip-text text-transparent  hover:scale-105 hover:bg-emerald-800-900 active:scale-95 
  transition transform duration-150 hover:border-cyan-500 hover:border-2 hover:shadow-lg  "
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className="relative z-10">
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 border border-slate-600 rounded-full font-bold bg-gradient-to-r from-red-700 to-pink-400 bg-clip-text text-transparent transition-transform duration-300 hover:scale-110"
      >
        Login
      </button>

      {showForm && (
        <div
          className="
          fixed
          inset-0
          flex
          items-center
          justify-center
          z-50
          my-64
          bg-black/30"
        >
          <div
            className="w-full max-w-md mx-4 sm:mx-0 
                          bg-white/95 rounded-3xl shadow-2xl 
                          px-8 py-6 space-y-6 border border-white/60"
          >
            {/* header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white/60">
                <span className="text-2xl">🔐</span>
              </div>
              <div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                  Welcome Back
                </h3>
                <p className="text-sm text-slate-600">
                  Sign in or create account to save & track jobs
                </p>
              </div>
            </div>

            {/* form */}
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 
                           bg-slate-50/80 focus:outline-none focus:ring-2 
                           focus:ring-indigo-400 focus:border-indigo-400 
                           text-sm placeholder-slate-400 shadow-inner"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 
                           bg-slate-50/80 focus:outline-none focus:ring-2 
                           focus:ring-purple-400 focus:border-purple-400 
                           text-sm placeholder-slate-400 shadow-inner"
              />

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => handleAuth("login")}
                  className="flex-1 px-4 py-2.5 rounded-xl 
                             bg-gradient-to-r from-blue-600 to-indigo-600 
                             text-white font-semibold text-sm 
                             shadow-md hover:shadow-lg hover:scale-105 
                             active:scale-95 transition-transform duration-150"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuth("signup")}
                  className="flex-1 px-4 py-2.5 rounded-xl 
                             bg-gradient-to-r from-emerald-600 to-teal-500 
                             text-white font-semibold text-sm 
                             shadow-md hover:shadow-lg hover:scale-105 
                             active:scale-95 transition-transform duration-150"
                >
                  Sign Up
                </button>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="text-xs text-slate-500 hover:text-slate-700 
                           hover:underline block mx-auto pt-1"
              >
                × Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
