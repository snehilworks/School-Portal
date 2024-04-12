import express from "express";
import * as homeController from "./../controller/homeController";

const router = express.Router();

router.get("/admissions", homeController.getAdmissions);

router.post("/contact", homeController.contactMessage);

// router.get("/academics-activities", homeController.getActivities);

export default router;
