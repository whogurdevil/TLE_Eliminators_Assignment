const cron = require('node-cron');
const fetchAndSyncAllStudents = require("../services/updateCfData").fetchAndSyncAllStudents;

// Run every minute
cron.schedule('0 2 * * *', fetchAndSyncAllStudents);

module.exports = fetchAndSyncAllStudents;
