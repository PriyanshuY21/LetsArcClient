const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const AdminProject = require('../../../adminprojects/backend/Models/Adminprojects');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { getUserDetails } = await import('../../../backend/Services/Auth.js');
    const user = await getUserDetails(req, res);

    if (!user || !user.firstName || !user.lastName) {
      return res.status(400).json({ message: 'Invalid user details' });
    }

    console.log("User First Name:", user.firstName);
    console.log("User Last Name:", user.lastName);

    const userFullName = `${user.firstName} ${user.lastName}`;

    const matchingAdminProjects = await AdminProject.find({ clientName: userFullName });

    if (matchingAdminProjects.length === 0) {
      return res.status(404).json({ message: 'No matching projects found in adminprojects database' });
    }

    const savedProjects = [];
    for (const adminProject of matchingAdminProjects) {
      const project = new Project({
        name: adminProject.projectName, 
        progress: {
          completed: adminProject.progress.completed, 
          total: adminProject.progress.total 
        },
        startDate: adminProject.date, 
      });

      const newProject = await project.save(); 
      savedProjects.push(newProject);
    }

    res.status(201).json(savedProjects); 
  } catch (err) {
    console.error("Error saving projects:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:name', async (req, res) => {
  try {
    const deletedProject = await Project.deleteOne({ name: req.params.name });
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
