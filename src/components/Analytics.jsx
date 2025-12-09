export default function Analytics({ saved }) {
  const total = saved.length;
  const remote = saved.filter((j) =>
    j.location?.toLowerCase().includes("remote")
  ).length;
  const applied = saved.filter((j) =>
    j.status?.toLowerCase().includes("applied")
  ).length;
  const interview = saved.filter((j) =>
    j.status?.toLowerCase().includes("interview")
  ).length;

  if (total == 0) {
    return null;
  }
  return (
    <div
      className="py-5 px-20 border border-blue-300 rounded-full bg-slate-300 
    "
    >
      <h3 className="mx-0 my-2 flex flex-wrap justify-center text-2xl bg-gradient-to-r font-bold from-green-600 to-red-600  bg-clip-text  text-transparent">
        Internship Insights
      </h3>
      <ul className=" text-1xl font-bold ">
        <li>Total saved: {total}</li>
        <li>Remote: {remote}</li>
        <li>Applied: {applied}</li>
        <li>Interview: {interview}</li>
      </ul>
    </div>
  );
}
