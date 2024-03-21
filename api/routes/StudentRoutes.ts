import express from "express";
import * as StudentController from "./../controller/StudentController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Student Related Routes Here!");
});

// Route to student register
router.post("/register", StudentController.register);

// Route for student login
router.post("/login", StudentController.login);

// Route to access student profile page
router.get("/profile", StudentController.getProfile);

// Route to access student Hostel Related information
router.get("/hostel", StudentController.getHostel);

// Route to access student dashboard
router.get("/dashboard", StudentController.getDashboard);

// Route to access gradebook
// router.get("/gradebook", StudentController.getGradebook);

// Route to access activities
router.get("/activities", StudentController.getActivities);

// Route to access schedule
router.get("/schedule", StudentController.getSchedule);

// Route to access exams
router.get("/exams", StudentController.getExams);

export default router;
