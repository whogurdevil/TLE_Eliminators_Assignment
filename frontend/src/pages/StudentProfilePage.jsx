import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProblemSolvingData from '../components/ProblemSolvingData';
import { fetchStudentById } from '../services/studentAPI';
import ContestHistory from '../components/ContestHistory';

const StudentProfilePage = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      const data = await fetchStudentById(studentId);
      setStudent(data);
    };
    loadStudent();
  }, [studentId]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Contest History Section */}
        <section className="p-4 rounded-xl h-full flex flex-col">
          <ContestHistory studentId={studentId} />
        </section>

        {/* Problem Solving Stats Section */}
        <section className="p-4 rounded-xl">
          <ProblemSolvingData studentId={studentId} />
        </section>
      </div>

    </div>
  );
};

export default StudentProfilePage;
