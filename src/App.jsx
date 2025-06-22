import React, { useState, useEffect } from "react";
import JobForm from "./components/JobForm.jsx";
import JobList from "./components/JobList.jsx";
import FilterBar from "./components/FilterBar.jsx";
import ProfileSection from "./components/ProfileSection.jsx";
import {
  getJobsFromStorage,
  saveJobsToStorage,
  getProfileFromStorage,
  saveProfileToStorage,
} from "./Utils/localStorage.js";

const STATUSES = ["Applied", "Interview", "Rejected", "Offer"];

export default function App() {
  const [jobs, setJobs] = useState(() => getJobsFromStorage());
  const [filter, setFilter] = useState("All");
  const [profile, setProfile] = useState(
    () =>
      getProfileFromStorage() || {
        name: "",
        age: "",
        jobType: "",
        salaryRange: "",
        skills: "",
        experience: "",
        motivationLevel: "",
      }
  );
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [aiAdvice, setAiAdvice] = useState("");
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

    
  const openaiKey = import.meta.env.VITE_OPENAI_KEY;
  useEffect(() => saveJobsToStorage(jobs), [jobs]);
  useEffect(() => saveProfileToStorage(profile), [profile]);

  const generateAdvice = async () => {
    setIsLoadingAdvice(true);
    try {
      if (!profile.name || jobs.length === 0) {
        setAiAdvice(
          "Please complete your profile and add job applications to get personalized advice"
        );
        return;
      }

      const prompt = `
        Act as a career coach. Provide 3 concise bullet points of advice for ${
          profile.name
        }, 
        a ${profile.experience || "experienced"} ${
        profile.jobType || "professional"
      } 
        with skills in ${profile.skills || "various technologies"}.

        Job search status:
        - Total applications: ${jobs.length}
        - ${jobs.filter((j) => j.status === "Interview").length} interviews
        - ${jobs.filter((j) => j.status === "Offer").length} offers

        Applications:
        ${jobs
          .map(
            (j, idx) =>
              `${idx + 1}. ${j.position} at ${j.company}${
                j.website ? ` (applied via: ${j.website})` : ""
              } [${j.status}]`
          )
          .join("\n")}

        Make the advice specific, actionable, and encouraging. Focus on:
        1. Application improvement
        2. Interview preparation
        3. Skill development
        end the advise with a powerful motivational quote. always call him with name and introduce yourself as friday. make sure the points are solid and perfect fit 
      `;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${REACT_APP_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 300,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid response format from API");
      }

      setAiAdvice(data.choices[0].message.content);
    } catch (error) {
      console.error("ChatGPT API Error:", error);
      alert("Error: " + error.message);
      setAiAdvice("Couldn't connect to career coach. Please try again later.");
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  const addJob = (job) => setJobs((prev) => [job, ...prev]);
  const deleteJob = (id) =>
    setJobs((prev) => prev.filter((job) => job.id !== id));

  const updateJobStatus = (id, newStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setShowProfileForm(false);
  };

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <div className="min-h-screen bg-[#06141B] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#CCDDCF] mb-2">
            Career Companion
          </h1>
          <p className="text-[#9BA8AB]">
            AI-powered job tracking and career coaching
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <ProfileSection
              profile={profile}
              showForm={showProfileForm}
              onToggleForm={() => setShowProfileForm(!showProfileForm)}
              onChange={handleProfileChange}
              onSubmit={handleProfileSubmit}
            />

            <div className="bg-[#11212D] rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-[#CCDDCF]">
                Career Coach
              </h3>

              {isLoadingAdvice ? (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-4 h-4 border-2 border-[#259745] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[#9BA8AB]">
                    Generating personalized advice...
                  </span>
                </div>
              ) : (
                <div className="text-[#9BA8AB] whitespace-pre-line mb-4">
                  {aiAdvice ||
                    (profile.name
                      ? "Add some job applications to get personalized advice"
                      : "Complete your profile to enable career coaching")}
                </div>
              )}

              <button
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={generateAdvice}
                disabled={isLoadingAdvice}
              >
                {isLoadingAdvice ? "Loading..." : "Generate Advice"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#11212D] rounded-xl p-6 shadow-md">
              <JobForm addJob={addJob} />
            </div>

            <div className="bg-[#11212D] rounded-xl p-6 shadow-md">
              <FilterBar filter={filter} setFilter={setFilter} />
              <JobList
                jobs={filteredJobs}
                updateJobStatus={updateJobStatus}
                deleteJob={deleteJob}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
