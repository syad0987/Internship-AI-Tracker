export default function Analytics({ saved }) {
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
  const applied = saved.filter((j) =>
    j.status?.toLowerCase().includes("applied")
  ).length;
  const interview = saved.filter((j) =>
    j.status?.toLowerCase().includes("interview")
  ).length;

  if (total === 0) return null;

  return (
    <div className="mb-4 p-4 bg-slate-100 rounded-xl shadow-sm">
      <h3
        className="text-center text-2xl font-bold mb-4 
        bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent"
      >
        Internship Insights
      </h3>

      <p className="text-xs text-slate-600">
        Total saved:
        <span className="font-semibold text-slate-900 ml-1">{total}</span> •
        Remote:
        <span className="font-semibold text-emerald-600 ml-1">
          {remoteCount}
        </span>{" "}
        • Recent:
        <span className="font-semibold text-blue-600 ml-1">{recentCount}</span>•
        Applied: <span className="text-emerald-700">{applied}</span>• Interview:{" "}
        <span className="text-indigo-700">{interview}</span>
      </p>
    </div>
  );
}
