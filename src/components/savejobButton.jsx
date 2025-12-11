import handleSaveJob from "./firestoreHelpers";
const SaveJobButton = ({ job, showToast }) => {
  const handleClick = async () => {
    try {
      await handleSaveJob(job, showToast);
      console.log("Saved to Firestore:", job.title);
    } catch (e) {
      console.error("Error saving job:", e);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-all duration-200"
      disabled={!job?.title}
    >
      Save
    </button>
  );
};
export default SaveJobButton;
