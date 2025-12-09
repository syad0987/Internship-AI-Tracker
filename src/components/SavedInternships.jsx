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

// import AuthBar from "./AuthBar";

import { onAuthStateChanged } from "firebase/auth";

export default function SavedInternship() {
  const [saved, setSaved] = useState([]);

  const total = saved.length;
  const remoteCount = saved.filter((job) =>
    job.location?.toLowerCase().includes("remote")
  ).length;
  const recentCount = saved.filter(
    (job) =>
      job.createdAt &&
      new Date(job.createdAt.toDate()) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

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
    } catch (err) {
      console.error("error deleting saved internship", err);
    }
  };

  return (
    <div className="mt-0 border-t border-slate-200 pt-2">
      <div className="mb-4 p-3 bg-slate-50 rounded-xl">
        <p className="text-xs text-slate-500">
          Total saved:
          <span className="font-semibold text-slate-900">{total}</span> •
          Remote:
          <span className="font-semibold text-emerald-600">{remoteCount}</span>•
          Recent:
          <span className="font-semibold text-blue-600">{recentCount}</span>
        </p>
      </div>
      <div className="mt-0 border-t border-slate-200 pt-2">
        <Analytics saved={saved} />
      </div>
      <h3 className="text-2xl text-slate-900 mb-3 mt-4 flex flex-wrap justify-center  bg-gradient-to-r font-bold from-blue-600 to-pink-600  bg-clip-text  text-transparent">
        Saved Internships ({saved.length})
      </h3>
      {saved.length === 0 && (
        <p className="text-sm text-slate-500">
          Click "Save" on any result to keep it here.
        </p>
      )}

      <div className="space-y-3">
        {saved.map((job) => (
          <div
            key={job.id}
            className="p-3 rounded-xl bg-white border border-slate-200 text-sm flex justify-between gap-3"
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
                    if (!user) {
                      console.log("No user logged in");
                      return;
                    }
                    await updateDoc(
                      doc(db, "users", user.uid, "savedInternships", job.id),
                      { status: newstatus }
                    );
                    console.log("status update to:", newstatus);
                  } catch (error) {
                    console.error("Error updating status:", error);
                  }
                }}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="wishlist"></option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <button
              onClick={() => handleRemove(job.id)}
              className="text-xs px-3 py-1 rounded-full border border-red-300 text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
