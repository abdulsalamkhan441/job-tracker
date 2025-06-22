import React from "react";

const filters = ["All", "Applied", "Interview", "Rejected", "Offer"];

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded-full text-sm border border-[#4A6C6A] transition-colors ${
            filter === f
              ? "bg-[#259745] text-[#CCDDCF]"
              : "bg-[#11212D] text-[#9BA8AB] hover:bg-[#1e3a4d]"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}