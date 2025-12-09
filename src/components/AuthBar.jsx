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
        <span className="text-slate-900 text-sm border border-slate-300 px-3 py-1 rounded-full  text-3xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent ">
          Hi, {user.email?.split("@")[0]}!
        </span>
        <button
          onClick={handleLogout}
          className=" px-3 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold bg-gradient-to-r from-red-800 to-red-400 bg-clip-text text-transparent"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 my-64">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleAuth("login")}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg"
              >
                Login
              </button>
              <button
                onClick={() => handleAuth("signup")}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg"
              >
                Sign Up
              </button>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="text-sm text-gray-500 hover:underline block mx-auto "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
