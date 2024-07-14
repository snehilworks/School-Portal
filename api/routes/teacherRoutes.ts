import express from "express";
import * as teacherController from "./../controller/teacherController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Teacher Related Routes already!");
});

// Teacher dashboard
// router.get("/dashboard", teacherController.getDashboard);

// Teacher login
router.post("/login", teacherController.login);

// View and edit profile
router.get("/profile", teacherController.getTeacherProfile);
// router.put("/profile", teacherController.updateProfile);

// View classes and class details
router.get("/classes", teacherController.getClasses);
router.get("/class/:id", teacherController.getClassDetails);

// View students and student details
router.get("/students", teacherController.getStudents);
router.get("/student/:id", teacherController.getStudentDetails);

router.get('/me', teacherController.getMeApi);

router.get('/:id', teacherController.getTeacher);

// Record and view attendance
// router.get("/attendance", teacherController.getAttendance);
// router.post("/attendance", teacherController.recordAttendance);

// View calendar
// router.get("/calendar", teacherController.getCalendar);

export default router;
