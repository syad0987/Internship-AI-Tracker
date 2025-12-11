export function EmptyState({ resetFilters }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <div className="w-32 h-32 mb-6 bg-slate-100 rounded-full flex items-center justify-center">
        <span className="text-4xl">🔍</span>
      </div>
      <h2 className="text-lg font-semibold text-slate-700 mb-2">
        No internships found
      </h2>
      <p className="text-slate-500 mb-4">
        Try adjusting your filters or search terms.
      </p>
      <button
        onClick={resetFilters}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Reset Filters
      </button>
    </div>
  );
}
