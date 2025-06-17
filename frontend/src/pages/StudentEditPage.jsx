import React, { useEffect, useState } from 'react';
import { fetchStudentById, updateStudent } from '../services/studentAPI';
import { useParams } from 'react-router-dom';

const StudentEdit = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [dots, setDots] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetchStudentById(studentId);
        setStudent(res);
      } catch (err) {
        setError('Failed to fetch student data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  useEffect(() => {
    let interval;
    if (updating) {
      interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);
    } else {
      setDots('');
    }
    return () => clearInterval(interval);
  }, [updating]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');


    try {
      await updateStudent(studentId, student);
      alert('Student updated successfully!');
    } catch (err) {
      setError('Failed to update student.');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-4 text-gray-800 dark:text-gray-100">Loading student data...</p>;
  if (error) return <p className="p-4 text-red-500 dark:text-red-400">{error}</p>;
  if (!student) return <p className="p-4 text-gray-800 dark:text-gray-100">No student found.</p>;

  return (
    <div className="min-h-screen px-4 py-8 flex items-start justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Student</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            disabled={updating}
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            disabled={updating}
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            disabled={updating}
            type="text"
            name="phone"
            value={student.phone || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Codeforces Handle</label>
          <input
            disabled={updating}
            type="text"
            name="cfHandle"
            value={student.cfHandle}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-700"
            required
          />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <label className="text-sm font-medium">Recieve Reminder Emails</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              disabled={updating}
              type="checkbox"
              name="reminderEmailDisabled"
              checked={student.reminderEmailDisabled}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer-checked:bg-blue-600 transition-all duration-300" />
            <span className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-200 rounded-full transition-all duration-300 peer-checked:translate-x-full" />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 disabled:bg-gray-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
          disabled={updating}
        >
          {updating ? `Fetching Codeforces profile${dots}` : 'Update Student'}
        </button>
      </form>
    </div>
  );
};

export default StudentEdit;
