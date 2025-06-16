const Student = require('../models/Student');
const { fetchAndSyncAllStudents } = require('../services/updateCfData');

exports.getStudents = async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
};

exports.addStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).json(newStudent);
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const updated = await Student.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.json({ message: 'Student deleted' });
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student", error: err.message });
  }
};

exports.getStudentsIdAndHandle = async (req, res) => {
  try {
    const students = await Student.find({}, '_id cfHandle');
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching IDs and handles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getStudentSubmissions = async (req, res) => {
  const { id } = req.params;
  const days = parseInt(req.query.days) || 90;

  try {
    const student = await Student.findById(id);

    if (!student || !student.submissions) {
      return res.status(404).json({ message: "Student or submissions not found" });
    }

    const now = Math.floor(Date.now() / 1000);
    const cutoff = now - days * 24 * 60 * 60;

    const filtered = student.submissions.filter(sub =>
      sub.verdict === 'OK' &&
      sub.creationTimeSeconds >= cutoff
    );

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getStudentContestHistory = async (req, res) => {
  const { id } = req.params;
  const days = parseInt(req.query.days) || 90;

  try {
    const student = await Student.findById(id);

    if (!student || !student.contestHistory) {
      return res.status(404).json({ message: "Student or contest history not found" });
    }

    const now = Math.floor(Date.now() / 1000);
    const cutoff = now - days * 24 * 60 * 60;

    // Filter contests based on ratingUpdateTimeSeconds
    const filtered = student.contestHistory.filter(contest =>
      contest.ratingUpdateTimeSeconds >= cutoff
    );

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.toggleReminderEmails = async (req, res) => {
  const { studentId } = req.params;
  const { disable } = req.body;

  const student = await Student.findByIdAndUpdate(studentId, {
    reminderEmailDisabled: disable
  }, { new: true });

  if (!student) return res.status(404).json({ error: 'Student not found' });

  res.json({ message: `Reminder emails ${disable ? 'disabled' : 'enabled'} for ${student.name}` });
};
