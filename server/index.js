const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const teacherRouter = require("./app/routes/teacher");
const studentRouter = require("./app/routes/student");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect("mongodb://localhost:27017/school", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "courses",
});

app.listen(3000, () => console.log("Server running on port 3000"));
