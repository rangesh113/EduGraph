const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  rollno: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  sem1: {
    mark1: Number,
    mark2: Number,
    mark3: Number,
  },
  sem2: {
    mark1: Number,
    mark2: Number,
    mark3: Number,
  },
  sem3: {
    mark1: Number,
    mark2: Number,
    mark3: Number,
  },
  sem4: {
    mark1: Number,
    mark2: Number,
    mark3: Number,
  },
});

const StudentModel = mongoose.model('studentids', StudentSchema);
module.exports = StudentModel;

