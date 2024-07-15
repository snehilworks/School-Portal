import express from "express";
import * as RazorPayController from "./../controller/RazorPayController";

const router = express.Router();

// Student Initiates Payment: The student selects a fee type and clicks "Pay".
// Create Order: Your server creates an order using the /create-order endpoint and sends the order details back to the client.
// Client-side Payment: The client uses Razorpay Checkout to handle the payment process.
// Payment Authorization: Once the payment is authorized, the client sends the paymentId to your server.
// Capture Payment: Your server captures the payment using the /capture-payment endpoint.
// Verify Payment: Optionally, you can fetch payment details to verify and store transaction information.

router.post("/order", RazorPayController.CreateOrder);
router.get("/orders", RazorPayController.FetchOrderList); 
router.get('/order/:id', RazorPayController.FetchSpecificOrder);

router.post('/capture-payment',RazorPayController.CapturePayment);
router.get('/payment-details/:paymentId', RazorPayController.FetchPaymentDetails);

export default router;