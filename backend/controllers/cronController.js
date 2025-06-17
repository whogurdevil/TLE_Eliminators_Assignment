const { updateSchedule, getCurrentSchedule } = require('../cron/UpdatedataCron');

exports.updateCronSchedule = (req, res) => {
  const { newSchedule } = req.body;

  try {
    updateSchedule(newSchedule);
    res.status(200).json({ message: 'Cron schedule updated', newSchedule });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCronSchedule = (req, res) => {
  res.status(200).json({ currentSchedule: getCurrentSchedule() });
};
