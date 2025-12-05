import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./../firebase";

const dEMO_USER_ID = "demo-user";
export default function SavedInternship() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "users", dEMO_USER_ID, "savedInternships"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapsort) => {
      const items = snapsort.doc.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSaved(items);
    });
    return () => unsub();
  }, []);
  return (
    <div className="mt-10 border-t border-slate-200 pt-6">
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
          </div>
        ))}
      </div>
    </div>
  );
}
