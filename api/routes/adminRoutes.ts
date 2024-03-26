import express from "express";
import {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  updateAdmissionStatus,
  getAdmissionList,
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
router.put("/student/:id", updateAdmissionStatus);

//Admission list get with the className
// router.get("/admissions/list", getAdmissionList);

//Admission list add
// router.post("/admissions", addAdmissionSeats);

//Admission list update
// router.put("/admissions", updateAdmission);

export default router;
