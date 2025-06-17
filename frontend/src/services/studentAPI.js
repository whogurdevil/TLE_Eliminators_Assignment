import axios from 'axios';

const API_BASE = 'http://192.168.1.35:5000/api';

export const fetchStudents = async () => {
  const res = await axios.get(`${API_BASE}/students`);
  return res.data;
};

export const deleteStudent = async (id) => {
  return axios.delete(`${API_BASE}/students/${id}`);
};

export const fetchStudentById = async (id) => {
  const res = await axios.get(`${API_BASE}/students/${id}`);
  return res.data;
};


export const updateStudent = async (id, updatedData) => {
  const res = await axios.put(`${API_BASE}/students/${id}`, updatedData);
  return res.data;
};

export const addStudent = async (newStudentData) => {
  const res = await axios.post(`${API_BASE}/students`, newStudentData);
  return res.data;
};




export const fetchContestHistory = async (stundetId, days=365) => {
  try {
    const res = await axios.get(`${API_BASE}/students/contestHistory/${stundetId}?days=${days}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch contest history from backend:', error.message);
    return [];
  }
};

export const filterContestsByDays = (contests, days) => {
  const now = Date.now() / 1000;
  return contests.filter(c => now - c.ratingUpdateTimeSeconds <= days * 24 * 3600);
};

export const fetchRecentSolvedProblems = async (stundetId, days = 90) => {
  try {
    const res = await axios.get(`${API_BASE}/students/submissions/${stundetId}?days=${days}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch solved problems:", error.message);
    return [];
  }
};

export const toggleEmailReminder = async (studentId, value) => {
  try {
    const res = await axios.patch(`${API_BASE}/students/toggleReminder/${studentId}`, {
      disable: value,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to toggle email reminder:", error.message);
    throw error;
  }
};



export const updateCronSchedule = async (newSchedule) => {
  try {
    const res = await axios.post(`${API_BASE}/cron/update-cron`, {
      newSchedule,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to update cron schedule:", error.message);
    throw error;
  }
};

export const fetchCurrentCronSchedule = async () => {
  try {
    const res = await axios.get(`${API_BASE}/cron/current-cron`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch current cron schedule:", error.message);
    return { currentSchedule: 'unknown' };
  }
};
