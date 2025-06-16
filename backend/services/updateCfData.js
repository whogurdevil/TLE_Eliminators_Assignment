const axios = require('axios');
const sendReminderEmail = require('../services/sendReminderEmail'); 
const Student = require('../models/Student')

const BASE_URL = 'http://localhost:5000/api'; // Use environment variable if possible

// Sync all students in the DB
const fetchAndSyncStudent = async (cfHandle, studentId) => {
  const sent = await sendReminderEmail('gur13dev@gmail.com', 'gurdev');
  if (!cfHandle || !studentId) {
    console.warn('Missing cfHandle or studentId');
    return;
  }

  try {
    const { data: contestHistory } = await axios.get(`${BASE_URL}/codeforces/history/${cfHandle}`);
    const { data: submissions } = await axios.get(`${BASE_URL}/codeforces/submissions/${cfHandle}`);
    const { data: ratingSummary } = await axios.get(`${BASE_URL}/codeforces/user/${cfHandle}`);

    const payload = {
      contestHistory: Array.isArray(contestHistory) ? contestHistory : [],
      submissions: Array.isArray(submissions) ? submissions : [],
      currentRating: ratingSummary.currentRating ?? null,
      maxRating: ratingSummary.maxRating ?? null,
      lastSyncedAt: new Date()
    };

    await axios.put(`${BASE_URL}/students/${studentId}`, payload);

    // ⏳ Inactivity detection
    const last7Days = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
    const recentSubmissions = submissions.filter(
      (s) => s.creationTimeSeconds >= last7Days
    );

    const student = await Student.findById(studentId);

    if (recentSubmissions.length === 0 && !student.reminderEmailDisabled) {
      const sent = await sendReminderEmail(student.email, student.name);

      if (sent) {
        student.reminderEmailCount += 1;
        await student.save();
      }
    }

    console.log(`✅ Synced and checked inactivity for ${cfHandle}`);
  } catch (err) {
    console.error(`❌ Failed to sync student ${cfHandle}: ${err.message}`);
  }
};

const fetchAndSyncAllStudents = async () => {
  try {
    const { data: students } = await axios.get(`${BASE_URL}/students/getStudentsIdAndHandle`);

    for (const student of students) {
      const { _id, cfHandle } = student;

      if (!cfHandle || !_id) continue;

      await fetchAndSyncStudent(cfHandle, _id);
    }

    console.log('✅ All student syncs completed at', new Date().toLocaleString());
  } catch (err) {
    console.error('❌ Error syncing all students:', err.message);
  }
};



module.exports = {
  fetchAndSyncAllStudents,
  fetchAndSyncStudent
};
