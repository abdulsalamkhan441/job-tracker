import React from "react";
import JobCard from "./JobCard";

export default function JobList({ jobs, updateJobStatus, deleteJob }) {
  if (jobs.length === 0)
    return <p className="text-[#9BA8AB] mt-4">No jobs to show.</p>;

  return (
    <ul className="space-y-3 mt-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          updateJobStatus={updateJobStatus}
          deleteJob={deleteJob}
        />
      ))}
    </ul>
  );
}