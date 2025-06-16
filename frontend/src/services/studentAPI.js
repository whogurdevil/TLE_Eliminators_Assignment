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
  return res.data;
};

// === Codeforces Contest History ===
export const fetchContestHistory = async (handle, days=365) => {
  try {
    const res = await axios.get(`${API_BASE}/codeforces/history/${handle}?days=${days}`);
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

export const fetchRecentSolvedProblems = async (handle, days = 90) => {
  try {
    const res = await axios.get(`${API_BASE}/codeforces/submissions/${handle}?days=${days}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch solved problems:", error.message);
    return [];
  }
};
