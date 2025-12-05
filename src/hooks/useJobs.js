import { useState, useEffect } from "react";
import { mockJobs } from "../data/mockJobs";
export function useJobs(query){
    const[jobs, setJobs]=useState([]);
    const [loading, setLoading]=useState(false);
    useEffect(()=>{
        const role= query.role.trim().toLowerCase();
        const loc=query.location.trim().toLowerCase();

        if(!role && !loc){
            setJobs([]);
            return;
        }
        setLoading(true);
        setTimeout(()=>{
            
            const filtered= mockJobs.filter((job)=>{
                const title=job.title.toLowerCase();
                const location=job.location.toLowerCase();
                const matchRole= role? title.includes(role) : true;
                const matchLoc= loc? location.includes(loc):true;
                 return matchRole && matchLoc;
                
            });
            setJobs(filtered);
            setLoading(false);

        },500);
    },[query.role, query.location])
    return{jobs: jobs || [], loading};
}