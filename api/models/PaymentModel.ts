import mongoose, { Schema, Document } from 'mongoose';

interface IPayment extends Document {
  orderId: string;
  paymentId: string;
  studentId: mongoose.Schema.Types.ObjectId;
  studentName: string;
  feeType: string;
  studentClass: mongoose.Schema.Types.ObjectId;
  amount: number;
  paymentStatus: string;
  paymentDate: Date;
}

const paymentSchema: Schema = new Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName: { type: String, required: true },
  feeType: { type: String, required: true }, // { annual , 6-month, monthly }
  studentClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;
