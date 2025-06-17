import React, { useEffect, useState } from 'react';
import { fetchStudents, toggleEmailReminder, deleteStudent, fetchCurrentCronSchedule } from '../services/studentAPI';
import { useNavigate } from 'react-router-dom';
import { exportToCsv } from '../services/exportToCsv';
import { Eye, Edit, Trash2 } from 'lucide-react';
import CodeforcesModal from '../components/ViewCordeforcesModal';

const StudentTableView = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

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
    <div className="w-full h-[calc(100vh)] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">All enrolled students</h1>

        <div className="flex flex-wrap gap-2">
          <button
            className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
            onClick={async () => {
              try {
                const { getCronSchedule, updateCronSchedule } = await import('../services/studentAPI');
                const current = await fetchCurrentCronSchedule();
                const newSchedule = prompt(
                  `Enter new cron schedule (e.g., */30 * * * * for every 30 mins): \nCurrent schedule: ${current.currentSchedule}`,
                  current.currentSchedule
                );

                if (newSchedule && newSchedule !== current.currentSchedule) {
                  await updateCronSchedule(newSchedule);
                  alert('Cron schedule updated successfully.');
                }
              } catch (error) {
                console.error('Error updating cron:', error);
                alert('Failed to update cron schedule.');
              }
            }}
          >
            Change Cron Time
          </button>

          <button
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
            onClick={() => navigate('/student/new')}
          >
            Add New Student
          </button>

          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
            onClick={() => exportToCsv(students)}
          >
            Download CSV
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              {[
                'Name', 'Email', 'Phone', 'Codeforces Handle',
                'Current Rating', 'Max Rating', 'Last Updated',
                'Reminders sent', 'Email Reminder', 'Actions'
              ].map((header) => (
                <th
                  key={header}
                  className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student._id}
                  className="text-center even:bg-gray-50 dark:even:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleView(student._id)}
                >
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{student.email}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{student.phone || 'N/A'}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{student.cfHandle}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{student.currentRating ?? '—'}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{student.maxRating ?? '—'}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {student.lastSyncedAt ? new Date(student.lastSyncedAt).toLocaleString() : '—'}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{student.reminderEmailCount ?? '—'}</td>

                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">

                      <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={!student.reminderEmailDisabled}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleReminder(student._id, student.reminderEmailDisabled);
                        }}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer-checked:bg-blue-600 transition-all duration-300" />
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-200 rounded-full transition-all duration-300 peer-checked:translate-x-full" />
                      </label>

                  </td>

                  <td
                    className="border border-gray-300 dark:border-gray-700 px-4 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center items-center gap-2">
                      <button
                        title="Codeforces Info"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => openModal(student)}
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && (
          <CodeforcesModal student={selectedStudent} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default StudentTableView;
