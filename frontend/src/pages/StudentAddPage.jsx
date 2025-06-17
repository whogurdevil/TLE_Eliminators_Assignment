import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../services/studentAPI';

const StudentAddPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cfHandle: '',
    reminderEmailDisabled: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dots, setDots] = useState('');

  useEffect(() => {
    let interval;
    if (isSubmitting) {
      interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);
    } else {
      setDots('');
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addStudent(formData);
      alert('Student added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to add student:', error);
      alert('Failed to add student');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Student</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            disabled={isSubmitting}
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            disabled={isSubmitting}
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            disabled={isSubmitting}
            type="text"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Codeforces Handle</label>
          <input
            disabled={isSubmitting}
            type="text"
            name="cfHandle"
            required
            value={formData.cfHandle}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-700"
          />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Recieve Reminder Emails</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                disabled={isSubmitting}
                type="checkbox"
                name="reminderEmailDisabled"
                checked={formData.reminderEmailDisabled}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer-checked:bg-blue-600 transition-all duration-300" />
              <span className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-200 rounded-full transition-all duration-300 peer-checked:translate-x-full" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition disabled:opacity-50"
        >
          {isSubmitting ? `Fetching Codeforces profile${dots}` : 'Add New Student'}
        </button>
      </form>
    </div>
  );
};

export default StudentAddPage;
