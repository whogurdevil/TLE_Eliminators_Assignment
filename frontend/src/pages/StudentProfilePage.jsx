import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProblemSolvingData from '../components/ProblemSolvingData';
import { fetchStudentById } from '../services/studentAPI';
import ContestHistory from '../components/ContestHistory';

const StudentProfilePage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      const data = await fetchStudentById(id);
      console.log(data, "student")
      setStudent(data);
    };
    loadStudent();
  }, [id]);

  if (!student) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-6">{student.name}'s Profile</h2>

      {/* Responsive grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contest History Section */}
        <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">📊 Contest History</h3>
          <ContestHistory handle={student.cfHandle} />
        </section>

        <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">🧠 Problem Solving Stats</h3>
          <ProblemSolvingData stats={student.cfHandle} />
        </section> 
      </div>
    </div>
  );
};

export default StudentProfilePage;
