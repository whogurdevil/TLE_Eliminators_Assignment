        import React, { useEffect, useState } from 'react';
        import { fetchStudentById, updateStudent } from '../services/studentAPI';
        import { useParams } from 'react-router-dom';

        const StudentEdit = () => {
          const { studentId } = useParams();
          const [student, setStudent] = useState(null);
          const [loading, setLoading] = useState(true);
          const [updating, setUpdating] = useState(false);
          const [error, setError] = useState('');

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
              alert('✅ Student updated successfully!');
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
            <div className="flex flex-col justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-auto">
              <h2 className="text-2xl font-semibold mb-4">Edit Student</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 p-2 rounded"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 p-2 rounded"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={student.phone || ''}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 p-2 rounded"
                  />
                </div>

                {/* CF Handle */}
                <div>
                  <label className="block text-sm font-medium mb-1">Codeforces Handle</label>
                  <input
                    type="text"
                    name="cfHandle"
                    value={student.cfHandle}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 p-2 rounded"
                    required
                  />
                </div>

                {/* Toggle Switch */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Disable Reminder Emails</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
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

                {/* Submit */}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded disabled:opacity-50"
                  disabled={updating}
                >
                  {updating ? 'Updating...' : 'Update Student'}
                </button>
              </form>
            </div>
          );
        };

        export default StudentEdit;
