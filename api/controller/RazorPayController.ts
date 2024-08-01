import { Request, Response } from "express";
import Razorpay from "razorpay";
import Payment from "../models/PaymentModel";

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY as string,
  key_secret: process.env.RAZORPAY_SECRET_KEY as string
});

export const CreateOrder = async (req: Request, res: Response) => {
    try {
        if (!process.env.RAZORPAY_ID_KEY || !process.env.RAZORPAY_SECRET_KEY) {
          throw new Error('Razorpay key_id and key_secret must be set in the environment variables.');
        }

        const { amount, studentName, studentClass } = req.body;
      
      const options = {
        amount: amount,  
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: '1',
        notes: {  
          studentName,
          studentClass
        }
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

const fetchOrders = async (skip:number, limit:number) => {
  const ordersResponse = await razor.orders.all({
    count: limit,
    skip: skip,
  });
  return ordersResponse.items;
};

export const FetchOrderList = async (req: Request, res:Response) => {
  try {
    if (!process.env.RAZORPAY_ID_KEY || !process.env.RAZORPAY_SECRET_KEY) {
      throw new Error('Razorpay key_id and key_secret must be set in the environment variables.');
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const orders = await fetchOrders(skip, limit);

    res.json({
      items: orders,
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(512).send('Error fetching orders');
  }
};

export const FetchPaidPayments = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const payments = await razor.payments.all({
      count: limit,
      skip: skip,
    });

    const paidPayments = payments.items.filter(payment => payment.status === "authorized");

    return res.status(201).json({
      items: paidPayments,
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(512).send('Error fetching Paid payments');
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

export const FetchAllPayments = async (req: Request, res: Response) => {
  try {
    const AllPayments = await razor.payments.all();

    return res.status(200).json(AllPayments);
  } catch (err) {
    console.log(err);
    res.status(512).send("Error");
  }
};

export const CapturePayment = async (req: Request, res: Response) => {
  const { paymentId, amount, currency, studentId, feeType } = req.body;

  try {
    const captureResponse = await razor.payments.capture(paymentId, amount, currency);

    const payment = new Payment({
      paymentId: captureResponse.id,
      studentId,
      feeType,
      amount: captureResponse.amount,
      currency: captureResponse.currency,
      status: captureResponse.status,
      captured: captureResponse.captured,
      createdAt: captureResponse.created_at
    });
    await payment.save();

    return res.status(200).json(captureResponse);
  } catch (err) {
    console.log(err);
    res.status(512).send("Error");
  }
};

export const FetchPaymentDetails = async (req:Request, res: Response) => {
  const { paymentId } = req.params;
  try {
    const paymentDetails = await razor.payments.fetch(paymentId);
    return res.status(200).json(paymentDetails);
  } catch (err) {
    console.log(err);
    res.status(512).send("Error");
  }
};