import { useState } from "react";
import { auth } from "./../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
export default function AuthBar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = auth.currentUser;
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
        <span className="text-slate-600">Hi, {user.email}</span>
        <button
          onClick={handleLogout}
          className=" px-3 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100"
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className="flex felx-wrap gap--2 text-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email "
        className="px-3 py-1 rounded-lg border border-slate-300"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter password"
        className="px-3 py-1 rounded-lg border border-slate-300"
      />
      <button onClick={() => handleAuth("login")}>Login</button>
      <button
        onClick={() => handleAuth("signup")}
        className="px-3 py-1 rounded-lg border border-slate-300"
      >
        Sign up
      </button>
    </div>
  );
}
