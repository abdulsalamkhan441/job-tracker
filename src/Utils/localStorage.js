export const getJobsFromStorage = () => {
  try {
    const data = localStorage.getItem("jobs");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading jobs from localStorage", error);
    return [];
  }
};

export const saveJobsToStorage = (jobs) => {
  try {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  } catch (error) {
    console.error("Error saving jobs to localStorage", error);
  }
};

export const getProfileFromStorage = () => {
  try {
    const data = localStorage.getItem("profile");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading profile from localStorage", error);
    return null;
  }
};

export const saveProfileToStorage = (profile) => {
  try {
    localStorage.setItem("profile", JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving profile to localStorage", error);
  }
};