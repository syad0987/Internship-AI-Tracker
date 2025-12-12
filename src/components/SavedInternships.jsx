import { useEffect, useState } from "react";
import { auth, db } from "./../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Analytics from "./Analytics";
import { SkeletonLoader } from "./SkeletonLoader";
import { EmptyState } from "./EmptyState";

import { onAuthStateChanged } from "firebase/auth";
import { Toast } from "bootstrap";

export default function SavedInternship({ showToast }) {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("👤 No user logged in");
        setSaved([]);
        return;
      }
      console.log("🔐 User logged in:", user.uid);

      const q = query(
        collection(db, "users", user.uid, "savedInternships"),
        orderBy("createdAt", "desc")
      );
      const unsub = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(" Firestore data received:", items);
        setSaved(items);

        setLoading(false);
      });
      return () => unsub();
    });
    return () => unsubscribeAuth();
  }, []);

  const handleRemove = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user logged in");
        return;
      }

      await deleteDoc(doc(db, "users", user.uid, "savedInternships", id));
      showToast("removed from saved.");
    } catch (err) {
      console.error("error deleting saved internship", err);
    }
  };

  return (
    <div className="mt-0 border-t border-slate-300 pt-4">
      {/* Analytics */}
      <div className="mt-0   border-slate-300 pt-4">
        <Analytics saved={saved} />
      </div>

      {/* Heading */}
      <h3
        className="text-2xl text-slate-900 mb-4 mt-6 text-center font-bold
      bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent border-t border-slate-300 pt-4"
      >
        Saved Internships ({saved.length})
      </h3>

      {/* Saved List */}
      <div>
        {loading ? (
          <SkeletonLoader />
        ) : saved.length === 0 ? (
          <EmptyState resetFilters={() => setSaved([])} />
        ) : (
          saved.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-300
            text-sm flex justify-between gap-3 shadow-sm hover:shadow-md
            transition-all duration-200"
            >
              <div>
                <p className="font-semibold text-slate-900">{job.title}</p>
                <p className="text-slate-600">
                  {job.company} • {job.location}
                </p>
              </div>

              <div className="flex gap-2 mt-2 sm:mt-0">
                <select
                  value={job.status}
                  onChange={async (e) => {
                    const newstatus = e.target.value;
                    try {
                      const user = auth.currentUser;
                      if (!user) return;

                      await updateDoc(
                        doc(db, "users", user.uid, "savedInternships", job.id),
                        { status: newstatus }
                      );
                    } catch (error) {
                      console.error("Error updating status:", error);
                    }
                  }}
                  className="text-sm border border-slate-300 rounded-lg px-3 py-1.5
      bg-slate-50 text-slate-800 shadow-sm
      hover:border-slate-400
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
      transition"
                >
                  <option value="wishlist">Wishlist</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => handleRemove(job.id)}
                className="text-xs px-3 py-1 rounded-full border border-red-300
              text-red-600 hover:bg-red-100 transition"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
