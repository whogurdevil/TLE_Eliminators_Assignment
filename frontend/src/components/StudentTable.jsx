import React from "react";
import StudentRow from "./StudentRow";

const StudentTable = ({ students, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CF Handle</th>
            <th>Rating</th>
            <th>Max</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow key={student._id} student={student} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
