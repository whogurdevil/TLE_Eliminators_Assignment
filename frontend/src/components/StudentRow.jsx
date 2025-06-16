import React from "react";

const StudentRow = ({ student, onDelete }) => {
  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-2">{student.name}</td>
      <td>{student.email}</td>
      <td>{student.phone}</td>
      <td>{student.cfHandle}</td>
      <td>{student.currentRating}</td>
      <td>{student.maxRating}</td>
      <td className="space-x-2">
        <button className="text-blue-500">View</button>
        <button className="text-green-500">Edit</button>
        <button onClick={() => onDelete(student._id)} className="text-red-500">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;
