import express from "express";
import {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  updateAdmissionStatus,
  getAllStudents,
  getAdmissionList,
  getFees,
  updateAdmissionSeats,
  getSpecificTeacher,
  getSpecificStudent,
  setClassTeacher
} from "./../controller/adminController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin Related Routes Here!");
});

// Fetching all teachers
router.get("/teachers", getAllTeachers);

// Fetching all Student List
router.get("/students", getAllStudents);

// Adding a new teacher
router.post("/teachers", addTeacher);

router.get('/teacher/:id', getSpecificTeacher)

// Updating teacher details
router.put("/teacher/:id", updateTeacher);

// Deleting a teacher
router.delete("/teacher/:id", deleteTeacher);

router.get('/student/:id', getSpecificStudent);

//student Updation : Admin
router.put("/student/:id", updateAdmissionStatus);

//see all the fees related things
router.get("/fees", getFees);

//post about the admission Seats availability and update from admin
router.put("/admission-seat", updateAdmissionSeats);

//put route for classteacher
router.put('/set-class-teacher', setClassTeacher);

//Admission list get with the className
// router.get("/admissions/list", getAdmissionList);

//Admission list add
// router.post("/admissions", addAdmissionSeats);

//Admission list update
// router.put("/admissions", updateAdmission);

export default router;

//api routes for defining classes with their respective class teachers
