const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Specific routes first
router.get('/getStudentsIdAndHandle', studentController.getStudentsIdAndHandle);
router.patch('/toggleReminder/:studentId', studentController.toggleReminderEmails);
router.get('/submissions/:id', studentController.getStudentSubmissions);
router.get('/contestHistory/:id', studentController.getStudentContestHistory);

// General routes later
router.get('/', studentController.getStudents);
router.post('/', studentController.addStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/:id', studentController.getStudentById); // Keep this LAST

module.exports = router;