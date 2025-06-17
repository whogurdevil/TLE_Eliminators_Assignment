const express = require('express');
const router = express.Router();
const { updateCronSchedule, getCronSchedule } = require('../controllers/cronController');

router.post('/update-cron', updateCronSchedule);
router.get('/current-cron', getCronSchedule);

module.exports = router;
