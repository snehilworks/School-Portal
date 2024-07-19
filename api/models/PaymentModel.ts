import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPayment extends Document {
  paymentId: string;
  studentId: Types.ObjectId; // Reference to the student
  feeType: string; // e.g., monthly, yearly, admission, hostel
  amount: number;
  currency: string;
  status: string;
  captured: boolean;
  createdAt: number;
}

const PaymentSchema: Schema = new Schema({
  paymentId: { type: String, required: true },
  studentId: { type: Types.ObjectId, ref: 'Student', required: true },
  feeType: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  captured: { type: Boolean, required: true },
  createdAt: { type: Number, required: true },
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
export default Payment;
