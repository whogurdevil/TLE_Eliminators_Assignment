// services/studentAPI.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// === Student APIs ===
export const fetchStudents = async () => {
  const res = await axios.get(`${API_BASE}/students`);
  return res.data;
};

export const deleteStudent = async (id) => {
  return axios.delete(`${API_BASE}/students/${id}`);
};

export const fetchStudentById = async (id) => {
  const res = await axios.get(`${API_BASE}/students/${id}`);
  console.log(res)
  return res.data;
};


export const updateStudent = async (id, updatedData) => {
  const res = await axios.put(`${API_BASE}/students/${id}`, updatedData);
  return res.data;
};


// === Codeforces Contest History ===
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
