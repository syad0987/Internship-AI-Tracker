import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./../firebase";
import { data } from "autoprefixer";

const dEMO_USER_ID = "demo-user";
export default function SavedInternship() {
  const [saved, setSaved] = useState([]);

  const total = saved.length;
  const remoteCount = saved.filter((job) =>
    job.location?.toLowerCase().includes("remote")
  ).length;
  const recentCount = saved.filter(
    (job) =>
      job.createAt &&
      new Date(job.createAt.toDate()) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  useEffect(() => {
    const q = query(
      collection(db, "users", dEMO_USER_ID, "savedInternships"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSaved(items);
    });
    return () => unsub();
  }, []);

  const handleRemove = async (id) => {
    try {
      deleteDoc(doc(db, "users", dEMO_USER_ID, "savedInternships", id));
    } catch (err) {
      console.error("error deleting saved internship", err);
    }
  };
  return (
    <div className="mt-10 border-t border-slate-200 pt-6">
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
      <h3 className="text-lg font-semibold text-slate-900 mb-3">
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
            className="p-3 rounded-xl bg-white border border-slate-200  text-sm flex justify-between gap-3"
          >
            <div>
              <p className="font-semibold text-slate-900">{job.title}</p>
              <p className="text-slate-600">
                {job.company}.{job.location}
              </p>
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
