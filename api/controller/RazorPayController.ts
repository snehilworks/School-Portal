import { Request, Response } from "express";
import Razorpay from "razorpay";
import Payment from "../models/PaymentModel";
import Class from "../models/classModel";
import crypto from 'crypto';
// import axios from 'axios';

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

interface PaymentData {
    orderId: string;
    paymentId: string;
    studentId: string;
    studentName: string;
    studentClass: string;
    amount: number;
    fieldType: string;
    paymentStatus: string;
    paymentDate: Date;
    feeType?: string;
  }

export const HandleVerifyPayment = async (req: Request, res: Response) => {
    try {
        const {
            orderId,
            paymentId,
            signature,
            studentId,
            studentName,
            fieldType,
            studentClass,
            amount,
            paymentDate,
            feeType
          } = req.body;

      // Create the expected signature
      const body = `${orderId}|${paymentId}`;
      const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY as string)
        .update(body.toString())
        .digest('hex');

      const isAuthentic = expectedSignature === signature;

      if (isAuthentic) {
          // Verify class existence
          const classRecord = await Class.findById(studentClass);
          if (!classRecord) {
            return res.status(400).json({ status: 'failure', message: 'Invalid class reference' });
          }

          try {
            let paymentData: PaymentData = {
              orderId,
              paymentId,
              studentId,
              studentName,
              studentClass,
              amount,
              fieldType,
              paymentStatus: 'success',
              paymentDate
            };

            // Add feeType only if fieldType is 'FEES'
            if (fieldType === 'FEES') {
              paymentData.feeType = feeType;
            }

            const payment = new Payment(paymentData);
            await payment.save();

          return res.status(201).json({ status: 'success' });
        } catch (error) {
          console.error('Error saving payment:', error);
          res.status(512).json({ status: 'error', message: "Internal Server Error" });
        }
      } else {
        res.status(422).json({ status: 'failure', message: 'Invalid signature' });
      }
    } catch (err) {
      console.error('Error verifying payment:', err);
      res.status(512).json({status: 'error', message: 'Internal Server Error'});
    }
  };

  export const GetAllPaidPayments = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 20, search = '', fieldType = '' } = req.query;

        // Calculate the number of payments to skip
        const skip = (Number(page) - 1) * Number(limit);

        // Construct the search query
        const searchQuery: any = {};
        if (search) {
            searchQuery.$or = [
                { paymentId: { $regex: search, $options: 'i' } },
                { studentName: { $regex: search, $options: 'i' } }
            ];
        }

        if (fieldType) {
            searchQuery.fieldType = fieldType;
        }

        // Retrieve payments with pagination
        const payments = await Payment.find(searchQuery)
            .sort({ paymentDate: -1 }) // Sort by paymentDate in descending order
            .skip(skip)
            .limit(Number(limit))
            .populate({
                path: 'studentClass', // assuming studentClass is a reference to the Class model
                select: 'className' // only select the className field
            });

        // Count total number of payments
        const totalPayments = await Payment.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalPayments / Number(limit));

        // Create next page link if there are more pages
        const nextPage = Number(page) < totalPages ? Number(page) + 1 : null;

        // Create previous page link if it's not the first page
        const prevPage = Number(page) > 1 ? Number(page) - 1 : null;

        res.status(200).json({
            status: 'success',
            currentPage: Number(page),
            totalPages,
            nextPage,
            prevPage,
            payments
        });
    } catch (err) {
        console.error('Error retrieving payments:', err);
        res.status(512).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const PaidPaymentDetails = async (req: Request, res: Response) => {
    try {
        const { paymentId } = req.params;

        // Validate paymentId if needed
        if (!paymentId) {
            return res.status(422).json({ status: 'error', message: 'Payment ID is required' });
        }

        const paymentDetail = await Payment.findOne({ paymentId });

        if (!paymentDetail) {
            return res.status(422).json({ status: 'error', message: 'Payment not found' });
        }

        return res.status(201).json(paymentDetail);
    } catch (err) {
        console.error('Error retrieving payments:', err);
        res.status(512).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const PaidPaymentReviewed = async (req: Request, res: Response) => {
    try {
        const { paymentId } = req.params;

        const updatedPayment = await Payment.findOneAndUpdate(
            { paymentId: paymentId }, // Find the document with this paymentId
            { review: true }, // Update the review field
            { new: true } // Return the updated document
          );

        if (!updatedPayment) {
          return res.status(422).json({ message: 'Payment Status not updated' });
        }

        return res.status(200).json(updatedPayment);
    } catch (err) {
        console.error('Error Updating payment status:', err);
        res.status(512).json({ status: 'error', message: 'Internal Server Error' });
    }
};
