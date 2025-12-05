import SavejobButton from "./savejobButton";
const JobCard = ({ job }) => {
  return (
    <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
        <p className="text-slate-600">
          {job.company} • {job.location}
        </p>
        <p>
          {job.type} • {job.stipend}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(job.skills) &&
            job.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-medium"
              >
                {skill}
              </span>
            ))}
        </div>
      </div>

      <div className="flex gap-2">
        <SavejobButton job={job}></SavejobButton>

        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
        >
          View / Apply
        </a>
      </div>
    </div>
  );
};

export default JobCard;
