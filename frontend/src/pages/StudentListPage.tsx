import React, { useEffect, useState } from "react";
import StudentTable from "../components/StudentTable";
import { fetchStudents, deleteStudent } from "../services/studentAPI";

const StudentListPage = () => {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const data = await fetchStudents();
    setStudents(data);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white text-black dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">🎯 Student Progress Dashboard</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition">
            ➕ Add Student
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
            ⬇️ Download CSV
          </button>
        </div>
      </div>

      <StudentTable students={students} onDelete={handleDelete} />
    </div>
  );
};

export default StudentListPage;
