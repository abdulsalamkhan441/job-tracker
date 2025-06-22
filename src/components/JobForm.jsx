import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const STATUSES = ["Applied", "Interview", "Rejected", "Offer"];

export default function JobForm({ addJob }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [website, setWebsite] = useState(""); 

  const handleSubmit = () => {
    if (!company || !position) return;
    const newJob = {
      id: uuidv4(),
      company,
      position,
      status,
      website, 
      date: new Date().toISOString().split("T")[0],
    };
    addJob(newJob);
    setCompany("");
    setPosition("");
    setStatus("Applied");
    setWebsite("");
  };

  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
        className="bg-[#11212D] border border-[#4A6C6A] text-[#CCDDCF] p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#259745] placeholder-[#9BA8AB]"
      />
      <input
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
        className="bg-[#11212D] border border-[#4A6C6A] text-[#CCDDCF] p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#259745] placeholder-[#9BA8AB]"
      />
      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website Applied"
        className="bg-[#11212D] border border-[#4A6C6A] text-[#CCDDCF] p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#259745] placeholder-[#9BA8AB]"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-[#11212D] border border-[#4A6C6A] text-[#CCDDCF] p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#259745]"
      >
        {STATUSES.map((s) => (
          <option key={s} className="bg-[#11212D]">{s}</option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        className="md:col-span-4 bg-[#259745] text-[#CCDDCF] py-2 px-4 rounded hover:bg-[#1e7e38] transition-colors duration-200 font-medium"
      >
        ➕ Add Job
      </button>
    </div>
  );
}