const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/getStudentsIdAndHandle', studentController.getStudentsIdAndHandle);
router.get('/', studentController.getStudents);
router.post('/', studentController.addStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/:id', studentController.getStudentById);
router.get('/submissions/:id', studentController.getStudentSubmissions);
router.get('/contestHistory/:id', studentController.getStudentContestHistory);
router.put('/student/toggleReminder/:studentId', studentController.toggleReminderEmails);



module.exports = router;
