import React, { useState } from 'react';
import axios from 'axios';

const Concern = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    problemType: '',
    projectName: '',
    email: '',
    comments: ''
  }); // State to manage form input values

  const [showDialog, setShowDialog] = useState(false); // Controls visibility of dialog box
  const [error, setError] = useState(''); // Manages error messages

  // Handles form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    const { firstName, lastName, problemType, projectName, email, comments } = formData;

    // Checks for empty fields
    if (!firstName || !lastName || !problemType || !projectName || !email || !comments) {
      setError('All fields are required');
      setShowDialog(true);
      return;
    }

    try {
      // Send form data to server
      await axios.post('http://localhost:5001/api/concerns', formData);
      setShowDialog(true); // Shows success dialog
      setError(''); // Clear any previous error messages

      // Clear form data after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        problemType: '',
        projectName: '',
        email: '',
        comments: ''
      });

    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit the form'); // Show an error message
      setShowDialog(true);
    }
  };

  // Handle closing dialog
  const handleCloseDialog = () => {
    setShowDialog(false);
    setError(''); // Clears error message when dialog is closed
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {error ? 'Error' : 'Concern Reported'}
            </h3>
            <p className="mb-4">
              {error || 'Your concern has been reported to the desired team. They will connect with you after some time.'}
            </p>
            <button
              onClick={handleCloseDialog}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="flex w-full max-w-4xl">
        <div className="w-1/3 pr-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Points of Contact</h2>
          <ul className="text-sm list-none">
            <li className="mb-4">
              <strong>Support</strong><br />
              <a href="mailto:support@tune.com" className="text-green-600 text-base">support@tune.com</a>
            </li>
            <li>
              <strong>Billing Enquiries</strong><br />
              <span className="text-green-600 text-base">+91-123456789</span>
            </li>
          </ul>
        </div>
        <div className="w-2/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Have a Problem</h2>
          <p className="text-sm mb-4 text-center text-gray-500">Please note: all fields are required</p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="firstName">Name</label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="problemType">Select Problem Type</label>
              <select
                id="problemType"
                value={formData.problemType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="" disabled>Select Problem Type</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                placeholder="Project Name"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="comments">Comments</label>
              <textarea
                id="comments"
                placeholder="Comments"
                value={formData.comments}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
              >
                Send Concern
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Concern;
