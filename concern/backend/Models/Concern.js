const mongoose = require('mongoose');

const concernSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  problemType: { type: String, required: true },
  projectName: { type: String, required: true },
  email: { type: String, required: true },
  comments: { type: String, required: true }
});

const Concern = mongoose.model('Concern', concernSchema);

module.exports = Concern;