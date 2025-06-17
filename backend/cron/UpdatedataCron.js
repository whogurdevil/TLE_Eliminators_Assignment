const cron = require('node-cron');
const { fetchAndSyncAllStudents } = require('../services/updateCfData');

let currentSchedule = process.env.CRON_SCHEDULE || '0 2 * * *'; // Default: 2 AM
let task = cron.schedule(currentSchedule, fetchAndSyncAllStudents, { scheduled: true });

function updateSchedule(newSchedule) {
  if (!cron.validate(newSchedule)) {
    throw new Error('Invalid cron expression');
  }

  task.stop();
  task = cron.schedule(newSchedule, fetchAndSyncAllStudents, { scheduled: true });
  currentSchedule = newSchedule;
  console.log(`✅ Cron schedule updated to: "${newSchedule}"`);
}

function getCurrentSchedule() {
  return currentSchedule;
}

module.exports = {
  updateSchedule,
  getCurrentSchedule,
};
