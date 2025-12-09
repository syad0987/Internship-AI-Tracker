import { useState, useEffect } from "react";
// const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
export function useJobs(query) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const role = query.role.trim().toLowerCase();
    const loc = query.location.trim().toLowerCase();

    if (!role && !loc) {
      setJobs([]);
      return;
    }
    const searchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://rapidapi.com/Pat92/api/jobs-api14/playground/apiendpoint_a8c3b3c2-f285-4139-88bc-41c026b6784f",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "7063e6a3c0mshef966cc5008805cp12d063jsn035185f07e48",
              "x-rapidapi-host": " jobs-api14.p.rapidapi.com",
            },
          }
        );

        const data = await response.json();
        setJobs(data.jobs || []);
      } catch (error) {
        console.error("job search error:", error);
        setJobs([
          {
            id: "demo1",
            title: `${role.charAt(0).toUpperCase() + role.slice(1)} Intern`,
            company: "TechCorp India",
            location: loc || "Remote",
            stipend: "₹15k-25k/month",
            skills: [role, "JavaScript", "React"],
            type: "Internship",
            applyUrl: "https://example.com/apply",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    const timeoutId = setTimeout(searchJobs, 500);
    return () => clearTimeout(timeoutId);
  }, [query.role, query.location]);

  return { jobs: jobs || [], loading };
}
