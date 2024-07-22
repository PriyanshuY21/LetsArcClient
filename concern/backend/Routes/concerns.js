const express = require('express');
const router = express.Router();
const Concern = require('../Models/Concern');

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, problemType, projectName, email, comments } = req.body;

    if (!firstName || !lastName || !problemType || !projectName || !email || !comments) {
      return res.status(400).send('All fields are required');
    }

    const concern = new Concern({ firstName, lastName, problemType, projectName, email, comments });
    await concern.save();

    res.status(200).send('Concern reported');
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
