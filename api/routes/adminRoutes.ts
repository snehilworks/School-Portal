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
  setFees,
  updateAdmissionSeats,
  getSpecificTeacher,
  getSpecificStudent,
  setClassTeacher,
  getAllClasses
} from "./../controller/adminController";
import FeeController  from './../controller/feeController';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin Related Routes Here!");
});

// Teachers Routes
router.get("/teachers", getAllTeachers);
router.post("/teachers", addTeacher);
router.get("/teachers/:id", getSpecificTeacher);
router.put("/teachers/:id", updateTeacher);
router.delete("/teachers/:id", deleteTeacher);

// Students Routes
router.get("/students", getAllStudents);
router.get("/students/:id", getSpecificStudent);
router.put("/students/:id", updateAdmissionStatus);

// Fees Routes
router.get("/fees", getFees);
router.post('/set-fees', setFees);

// Class Routes
router.get('/classes', getAllClasses);
router.put("/admission-seat/:id", updateAdmissionSeats);
router.put("/set-class-teacher/:id", setClassTeacher);

//Admission list get with the className
// router.get("/admissions/list", getAdmissionList);

//Fee Routes
router.post('/create-payment', FeeController.createPayment);
router.post('/payment-success', FeeController.handlePaymentSuccess);
router.get('/payment/:paymentId', FeeController.getPaymentDetails);

//Admission list add
// router.post("/admissions", addAdmissionSeats);

//Admission list update
// router.put("/admissions", updateAdmission);

export default router;

//api routes for defining classes with their respective class teachers
