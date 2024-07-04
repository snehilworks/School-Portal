import express from "express";
import * as RazorPayController from "./../controller/RazorPayController";

const router = express.Router();

router.post("/order", RazorPayController.CreateOrder);
router.get("/orders", RazorPayController.FetchOrderList); 
router.get('/order/:id', RazorPayController.FetchSpecificOrder);
//rest all of the routes here... 

export default router;