import express from "express";
import * as homeController from "./../controller/homeController";

const router = express.Router();

router.get("/admissions", homeController.getAdmissions);

router.post("/contact", homeController.contactMessage);

export default router;
