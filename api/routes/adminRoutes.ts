import express from "express";
import {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  updateAdmissionStatus
} from "./../controller/adminController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin Related Routes Here!");
});

// Fetching all teachers
router.get("/teachers", getAllTeachers);

// Adding a new teacher
router.post("/teachers", addTeacher);

// Updating teacher details
router.put("/teachers/:id", updateTeacher);

// Deleting a teacher
router.delete("/teachers/:id", deleteTeacher);

//student Updation : Admin

router.post("/student/:id", updateAdmissionStatus);

export default router;
