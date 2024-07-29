import express from "express";
import * as homeController from "./../controller/homeController";

const router = express.Router();

router.post("/contact", homeController.contactMessage);

router.get('/classes', homeController.getClasses);

router.post('/admission-form', homeController.admissionForm);

router.get('/admission-fees', homeController.admissionFees);

export default router;
