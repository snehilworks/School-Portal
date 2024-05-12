import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET',
  });

class FeeController {   
    static async createPayment(req: Request, res: Response) {
        const { amount, currency, email } = req.body;
    
        const options = {
          amount: amount * 100, // Amount in paise
          currency,
          receipt: uuidv4(),
          payment_capture: 1,
          notes: {
            email,
          },
        };
    
        try {
          const order = await razorpay.orders.create(options);
          res.json(order);
        } catch (error) {
          // console.error("Error adding teacher:", error);
          res.status(512).json({ message: "Internal server error" });
        }
      }

      static async handlePaymentSuccess(req: Request, res: Response) {
        const { paymentId, orderId } = req.body;
    
        try {
          // Fetch payment details from Razorpay
          const payment = await razorpay.payments.fetch(paymentId);
    
          // Handle payment success logic (e.g., update database, send confirmation email)
          // Example:
          const { email } = payment.notes;
          // Update database to mark payment as successful
          // Send confirmation email to the student
          res.json({ message: 'Payment successful', email });
        } catch (error) {
          // console.error("Error adding teacher:", error);
          res.status(512).json({ message: "Internal server error" });
        }
      }
    
      static async getPaymentDetails(req: Request, res: Response) {
        const { paymentId } = req.params;
    
        try {
          // Fetch payment details from Razorpay
          const payment = await razorpay.payments.fetch(paymentId);
          res.json(payment);
        } catch (error) {
            // console.error("Error adding teacher:", error);
            res.status(512).json({ message: "Internal server error" });
        }
      }
};

export default FeeController;