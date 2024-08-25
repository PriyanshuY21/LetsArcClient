const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const AdminProject = require('../../../adminprojects/backend/Models/Adminprojects');

// Route to get all projects
router.get('/', async (req, res) => {
  try {
    // Fetches all projects from Project collection
    const projects = await Project.find();
    // Sends list of projects as JSON response
    res.json(projects);
  } catch (err) {
    // Handle any errors that occur during query
    res.status(500).json({ message: err.message });
  }
});

// Route to create new projects based on admin projects
router.post('/', async (req, res) => {
  try {
    // Dynamically import getUserDetails function
    const { getUserDetails } = await import('../../../backend/Services/Auth.js');
    // Retrieve user details from request
    const user = await getUserDetails(req, res);

    // Checks if user details are valid
    if (!user || !user.firstName || !user.lastName) {
      return res.status(400).json({ message: 'Invalid user details' });
    }

    // Logs user details for debugging purposes
    console.log("User First Name:", user.firstName);
    console.log("User Last Name:", user.lastName);

    // Combine first and last name to match clientName in admin projects
    const userFullName = `${user.firstName} ${user.lastName}`;

    // Find matching admin projects based on the client's full name
    const matchingAdminProjects = await AdminProject.find({ clientName: userFullName });

    // If no matching projects are found, respond with a 404 error
    if (matchingAdminProjects.length === 0) {
      return res.status(404).json({ message: 'No matching projects found in adminprojects database' });
    }

    // Array to hold saved projects
    const savedProjects = [];
    // Iterate over matching admin projects
    for (const adminProject of matchingAdminProjects) {
      // Creates new project object
      const project = new Project({
        name: adminProject.projectName, 
        progress: {
          completed: adminProject.progress.completed, 
          total: adminProject.progress.total 
        },
        startDate: adminProject.date, 
      });

      // Saves new project to database
      const newProject = await project.save(); 
      // Add saved project to array
      savedProjects.push(newProject);
    }

    // Respond with array of saved projects
    res.status(201).json(savedProjects); 
  } catch (err) {
    // Handle any errors that occur during process
    console.error("Error saving projects:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Route to delete a project by name
router.delete('/:name', async (req, res) => {
  try {
    // Deletes project from Project collection by name
    const deletedProject = await Project.deleteOne({ name: req.params.name });
    // Check if a project was deleted
    if (!deletedProject.deletedCount) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Respond with a success message
    res.json({ message: 'Project deleted' });
  } catch (err) {
    // Handle any errors that occur during deletion
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
