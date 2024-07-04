import { Request, Response } from "express";
import Razorpay from "razorpay";

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY as string,
  key_secret: process.env.RAZORPAY_SECRET_KEY as string
});

export const CreateOrder = async (req: Request, res: Response) => {
    try {
        if (!process.env.RAZORPAY_ID_KEY || !process.env.RAZORPAY_SECRET_KEY) {
          throw new Error('Razorpay key_id and key_secret must be set in the environment variables.');
        }

      const amount = req.body.amount;
      
      const options = {
        amount: amount,  
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: '1'
      };
      const order = await razor.orders.create(options);
    
      if(!order) {
        return res.status(408).send("No Order was made.");
      }
    
      res.json(order);
    } catch (err) {
      console.log(err);
      res.status(512).send("Error");
    }
};

export const FetchOrderList = async (req: Request, res: Response) => {
    try {
        if (!process.env.RAZORPAY_ID_KEY || !process.env.RAZORPAY_SECRET_KEY) {
            throw new Error('Razorpay key_id and key_secret must be set in the environment variables.');
        }

        const orders = await razor.orders.all();

        res.send(orders);
    } catch (err) {
      console.log(err);
      res.status(512).send("Error");
    }
}

export const FetchSpecificOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
        return res.status(422).json({ error: 'Order ID is required' });
    }

    const order = await razor.orders.fetch(orderId);

    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(512).send("Error");
  }
};