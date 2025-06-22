export default function ProfileSection({ profile, showForm, onToggleForm, onChange, onSubmit }) {
  return (
    <div className="bg-[#11212D] rounded-xl p-6 shadow-md border border-[#4A6C6A]">
      {showForm ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <h3 className="font-semibold text-lg text-[#CCDDCF]">Your Profile</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#9BA8AB] mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={onChange}
                className="w-full p-2 border border-[#4A6C6A] rounded-lg bg-[#06141B] text-[#CCDDCF] focus:outline-none focus:ring-1 focus:ring-[#259745]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#9BA8AB] mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={onChange}
                className="w-full p-2 border border-[#4A6C6A] rounded-lg bg-[#06141B] text-[#CCDDCF] focus:outline-none focus:ring-1 focus:ring-[#259745]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#9BA8AB] mb-1">Job Type</label>
              <input
                type="text"
                name="jobType"
                value={profile.jobType}
                onChange={onChange}
                className="w-full p-2 border border-[#4A6C6A] rounded-lg bg-[#06141B] text-[#CCDDCF] focus:outline-none focus:ring-1 focus:ring-[#259745]"
                placeholder="e.g. Frontend Developer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#9BA8AB] mb-1">Salary Range</label>
              <select
                name="salaryRange"
                value={profile.salaryRange}
                onChange={onChange}
                className="w-full p-2 border border-[#4A6C6A] rounded-lg bg-[#06141B] text-[#CCDDCF] focus:outline-none focus:ring-1 focus:ring-[#259745]"
              >
                <option value="" className="bg-[#11212D]">Select</option>
                <option value="0-30k" className="bg-[#11212D]">0-30k</option>
                <option value="30k-60k" className="bg-[#11212D]">30k-60k</option>
                <option value="60k-100k" className="bg-[#11212D]">60k-100k</option>
                <option value="100k+" className="bg-[#11212D]">100k+</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#9BA8AB] mb-1">Skills</label>
              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={onChange}
                className="w-full p-2 border border-[#4A6C6A] rounded-lg bg-[#06141B] text-[#CCDDCF] focus:outline-none focus:ring-1 focus:ring-[#259745]"
                placeholder="e.g. React, Node.js, UX Design"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#9BA8AB] mb-1">Experience Level</label>
              <select
                name="experience"
                value={profile.experience}
                onChange={onChange}
                className="w-full p-2 border border-[#4A6C6A] rounded-lg bg-[#06141B] text-[#CCDDCF] focus:outline-none focus:ring-1 focus:ring-[#259745]"
              >
                <option value="" className="bg-[#11212D]">Select</option>
                <option value="Entry-level" className="bg-[#11212D]">Entry-level</option>
                <option value="Mid-level" className="bg-[#11212D]">Mid-level</option>
                <option value="Senior" className="bg-[#11212D]">Senior</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onToggleForm}
              className="px-4 py-2 text-[#9BA8AB] hover:text-[#CCDDCF] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#259745] text-[#CCDDCF] rounded-lg hover:bg-[#1e7e38] transition-colors"
            >
              Save Profile
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-[#CCDDCF]">Your Profile</h3>
            <button
              onClick={onToggleForm}
              className="text-[#259745] hover:text-[#1e7e38] text-sm font-medium transition-colors"
            >
              Edit Profile
            </button>
          </div>
          
          {profile.name ? (
            <div className="space-y-3 text-[#9BA8AB]">
              <p><span className="font-medium text-[#CCDDCF]">Name:</span> {profile.name}</p>
              <p><span className="font-medium text-[#CCDDCF]">Looking for:</span> {profile.jobType || "Not specified"}</p>
              <p><span className="font-medium text-[#CCDDCF]">Target Salary:</span> {profile.salaryRange || "Not specified"}</p>
              <p><span className="font-medium text-[#CCDDCF]">Skills:</span> {profile.skills || "Not specified"}</p>
            </div>
          ) : (
            <div className="text-center py-4 text-[#9BA8AB]">
              <p>No profile information yet</p>
              <button
                onClick={onToggleForm}
                className="mt-2 px-4 py-2 bg-[#259745] text-[#CCDDCF] rounded-lg hover:bg-[#1e7e38] text-sm transition-colors"
              >
                Create Profile
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}