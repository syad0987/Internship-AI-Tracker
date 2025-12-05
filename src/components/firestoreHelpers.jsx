import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./../firebase";

const DEMO_USER_ID = "demo-user";
export const saveJobToFirestore = async (job) => {
  return await addDoc(
    collection(db, "users", DEMO_USER_ID, "savedInternship"),
    {
      title: job.title,
      company: job.company,
      loaction: job.location,
      stipend: job.stipend,
      skills: job.skills,
      createdAt: serverTimestamp(),
    }
  );
};
