import { saveJobToFirestore } from "./firestoreHelpers";

const SavejobButton = ({ job }) => {
  const handleSaveJob = async () => {
    try {
      await saveJobToFirestore(job);
      console.log("Saved to Firestore:", job.title);
    } catch (e) {
      console.error("Error saving job:", e);
    }
  };
  return (
    <button
      onClick={handleSaveJob}
      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-all duration-200"
      disabled={!job?.title}
    >
      Save
    </button>
  );
};
export default SavejobButton;
