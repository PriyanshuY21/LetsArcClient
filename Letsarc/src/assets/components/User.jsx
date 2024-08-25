import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSave, FaEdit } from 'react-icons/fa';

const User = () => {
  // State to hold form data and current editing status
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    email: '',
    contact: ''
  });
  const [editing, setEditing] = useState(true); // State to track if form is in edit mode
  const [currentId, setCurrentId] = useState(null); // State to hold current user ID

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch user data from server
      const res = await axios.get('http://localhost:5000/api/users');
      if (res.data.length > 0) {
        const user = res.data[0]; // Assumes we are working with first user
        setFormData(user); // Sets fetched user data into formData
        setCurrentId(user._id); // Stores user ID
        setEditing(false); // Set editing to false since we are displaying existing data
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle changes in input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      // If an ID exists, updates existing user data
      await axios.put(`http://localhost:5000/api/users/${currentId}`, formData);
    } else {
      // Otherwise, create a new user
      const res = await axios.post('http://localhost:5000/api/users', formData);
      setCurrentId(res.data._id); // Sets new user ID
    }
    setEditing(false); // Switches back to non-editing mode after saving
  };

  // Handles edit button click
  const handleEdit = () => {
    setEditing(true); // Enables editing mode
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Welcome!!</h2>
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
                className={`flex-grow p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
                readOnly={!editing} // Disables input if not in editing mode
              />
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={`flex-grow p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
                readOnly={!editing} 
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="organizationName">Organization Name</label>
            <input
              type="text"
              id="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
              readOnly={!editing} 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
              readOnly={!editing} 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="contact">Contact Number</label>
            <input
              type="text"
              id="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
              readOnly={!editing} 
            />
          </div>
          <div className="flex justify-center space-x-4">
            <button type="button" onClick={handleEdit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-opacity duration-300">
              <FaEdit />
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-opacity duration-300">
              <FaSave />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
