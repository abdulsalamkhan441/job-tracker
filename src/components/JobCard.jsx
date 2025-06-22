import React from "react";

const STATUSES = ["Applied", "Interview", "Rejected", "Offer"];

export default function JobCard({ job, updateJobStatus, deleteJob }) {
  return (
    <li className="p-4 bg-[#11212D] rounded shadow flex justify-between items-start border border-[#4A6C6A]">
      <div>
        <h3 className="font-semibold text-[#CCDDCF]">
          {job.position} at {job.company}
        </h3>
        <p className="text-sm text-[#9BA8AB]">
          Status: {job.status} | Applied on: {job.date}
        </p>
        {job.website && (
          <p className="text-xs text-[#259745] break-all">
            Website:{" "}
            <a
              href={job.website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {job.website}
            </a>
          </p>
        )}
        <select
          value={job.status}
          onChange={(e) => updateJobStatus(job.id, e.target.value)}
          className="mt-2 bg-[#06141B] border border-[#4A6C6A] text-[#CCDDCF] p-1 rounded focus:outline-none focus:ring-1 focus:ring-[#259745]"
        >
          {STATUSES.map((s) => (
            <option key={s} className="bg-[#11212D]">
              {s}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => deleteJob(job.id)}
        className="text-[#9BA8AB] hover:text-[#CCDDCF] transition-colors"
      >
        ✖
      </button>
    </li>
  );
}