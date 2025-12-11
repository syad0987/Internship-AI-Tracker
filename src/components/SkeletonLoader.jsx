export function SkeletonLoader() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse p-5 bg-white rounded-2xl border border-slate-200"
        >
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-1/4 mb-1" />
          <div className="h-3 bg-slate-200 rounded w-1/5" />
        </div>
      ))}
    </div>
  );
}
