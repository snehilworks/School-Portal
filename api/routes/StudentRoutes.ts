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
router.get('/me', StudentController.getMeApi);
router.get("/profile", StudentController.getProfile);

// Route to access student Hostel Related information
// router.get("/hostel", StudentController.getHostel);

router.get('/class', StudentController.getClass);

router.get('/fee-structure', StudentController.getFeeStructure);

router.post('/hostel-form', StudentController.HostelFormStore)

router.post('/complete-student-profile', StudentController.completeStudentProfile);

router.get('/class-fee/:id', StudentController.getFeeForClass);

export default router;
