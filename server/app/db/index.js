const mongoose = require("mongoose");

// Define the Student Schema
const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  class: String,
  roll_no: Number,
  marks: [
    {
      subject: String,
      score: Number,
    },
  ],
  attendance: [
    {
      date: Date,
      isPresent: Boolean,
    },
  ],
  profile: {
    name: String,
    class: String,
    roll_no: Number,
  },
  timetable: [
    {
      day: String,
      time: String,
      subject: String,
    },
  ],
  announcements: [
    {
      title: String,
      content: String,
      date: Date,
    },
  ],
  queries: [
    {
      content: String,
      date: Date,
    },
  ],
});

// Define the Teacher Schema
const teacherSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profile: {
    time_table: [
      {
        day: String,
        time: String,
        subject: String,
      },
    ],
    classTeacher: String,
    subjectTeacher: [
      {
        subject: String,
        class: String,
      },
    ],
  },
});

// Create models from the schemas
const Student = mongoose.model("Student", studentSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);

// Export the models for use in your application
module.exports = { Student, Teacher };
