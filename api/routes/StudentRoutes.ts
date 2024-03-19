import express from "express";
// import * as StudentController from "./../controller/StudentController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Student Related Routes Here!");
});

// router.get("/dashboard", studentController.getDashboard);

export default router;
