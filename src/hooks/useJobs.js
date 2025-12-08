import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
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
          "https://linkedin-job-search-api.p.rapidapi.com/active-jb-1h?offset=0&description_type=text",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": apiKey,
              "x-rapidapi-host": "linkedin-job-search-api.p.rapidapi.com",
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
