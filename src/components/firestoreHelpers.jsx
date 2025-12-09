import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const handleSaveJob = async (job) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please Log in to save internships");
    return;
  }

  try {
    await addDoc(collection(db, "users", user.uid, "savedInternships"), {
      title: job.title,
      company: job.company,
      location: job.location,
      stipend: job.stipend,
      skills: job.skills,
      status: "wishlist",
      mode: job.location.toLowerCase().includes("remote")
        ? "remote"
        : job.location.toLowerCase().includes("hybrid")
        ? "hybrid"
        : "onsite",
      createdAt: serverTimestamp(),
    });
    console.log("✅ Saved:", job.title);
  } catch (error) {
    console.error("Save error:", error);
  }
};
export default handleSaveJob;
