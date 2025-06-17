import React, { useEffect, useState } from 'react';
import { fetchStudents, toggleEmailReminder, deleteStudent } from '../services/studentAPI';
import { useNavigate } from 'react-router-dom';
import { exportToCsv } from '../services/exportToCsv';
import { Eye, Edit, Trash2 } from 'lucide-react';

const StudentTableView = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const res = await fetchStudents();
        setStudents(res);
      } catch (error) {
        console.error('Failed to fetch students:', error);
        setStudents([]);
      }
    };

    fetchTableData();
  }, []);

  const handleView = (id) => {
    navigate(`/student/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/student/edit/${id}`);
  };

  const handleToggleReminder = async (id, currentStatus) => {
    try {
      await toggleEmailReminder(id, !currentStatus);
      setStudents((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, reminderEmailDisabled: !currentStatus } : s
        )
      );
    } catch (error) {
      console.error('Failed to toggle reminder:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await deleteStudent(id); 
      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Failed to delete student:", error);
      alert("Failed to delete student. Please try again.");
    }
  };


  return (
    <div className="h-screen w-screen overflow-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All enrolled students</h1>
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
          onClick={() => exportToCsv(students)}
        >
          📥 Download CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Name</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Email</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Phone</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Codeforces Handle</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Current Rating</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Max Rating</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Email Reminder</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student._id}
                  className="text-center even:bg-gray-50 dark:even:bg-gray-800"
                >
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{student.email}</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {student.phone || 'N/A'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{student.cfHandle}</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {student.currentRating ?? '—'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {student.maxRating ?? '—'}
                  </td>

                  {/* Toggle Switch */}
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!student.reminderEmailDisabled}
                        onChange={() => handleToggleReminder(student._id, student.reminderEmailDisabled)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-500 transition-all duration-300"></div>
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-300 peer-checked:translate-x-full"></div>
                    </label>


                  </td>

                  {/* Actions with Icons */}
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-center gap-2">
                    <button
                      title="View"
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => handleView(student._id)}
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      title="Edit"
                      className="text-green-500 hover:text-green-600"
                      onClick={() => handleEdit(student._id)}
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      title="Delete"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(student._id)}
                    >
                      <Trash2 size={20} />
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTableView;
