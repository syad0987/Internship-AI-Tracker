import SaveJobButton from "./SavejobButton";

const JobCard = ({ job, saved = [], showToast }) => {
  const isSaved = saved.some(
    (s) => s.title === job.title && s.company === job.company
  );

  return (
    <div
      className="p-5 bg-slate-50 rounded-2xl shadow-sm border border-slate-300
      flex flex-col md:flex-row md:items-center md:justify-between gap-4
      hover:shadow-md transition"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          {job.title}

          {isSaved && (
            <span
              className="ml-2 text-xs px-2 py-0.5 rounded-full 
              bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              Saved
            </span>
          )}
        </h3>

        <p className="text-slate-600">
          {job.company} • {job.location}
        </p>

        <p className="text-slate-700">
          {job.type} • {job.stipend}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(job.skills) &&
            job.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-full 
                bg-blue-100 text-blue-700 font-medium"
              >
                {skill}
              </span>
            ))}
        </div>
      </div>

      <div className="flex gap-2">
        <SaveJobButton job={job} showToast={showToast} />

        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl border border-slate-300 
          text-sm font-semibold text-slate-800 hover:bg-slate-100 transition"
        >
          View / Apply
        </a>
      </div>
    </div>
  );
};

export default JobCard;
