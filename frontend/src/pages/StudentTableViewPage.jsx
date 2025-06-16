import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../services/studentAPI';
import { useNavigate } from 'react-router-dom';
import { exportToCsv } from '../services/exportToCsv';

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

  return (
    <div className="h-screen w-screen overflow-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Student Table View</h1>
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
          onClick={() => exportToCsv(students)}
        >
          Download CSV
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
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-1 transition"
                      onClick={() => handleView(student._id)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-1 transition"
                      onClick={() => handleEdit(student._id)}
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
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
