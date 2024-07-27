import express from "express";
import * as homeController from "./../controller/homeController";

const router = express.Router();

router.post("/contact", homeController.contactMessage);

router.get('/classes', homeController.getClasses);

export default router;
