import mongoose, { Schema, Document } from 'mongoose';

interface IPayment extends Document {
  orderId: string;
  paymentId: string;
  studentId?: mongoose.Schema.Types.ObjectId;
  studentName: string;
  fieldType: 'ADMISSION' | 'FEES' | 'HOSTEL';
  feeType?: 'ANNUAL' | '6-MONTH' | 'MONTHLY';
  studentClass: mongoose.Schema.Types.ObjectId;
  amount: number;
  paymentStatus: string;
  paymentDate: Date;
  review: boolean;
}

const paymentSchema: Schema = new Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
  studentName: { type: String, required: true },
  fieldType: {
    type: String,
    required: true,
    enum: ['ADMISSION', 'FEES', 'HOSTEL']
  },
  feeType: {
    type: String,
    enum: ['ANNUAL', '6-MONTH', 'MONTHLY']
  },
  studentClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
  review: { type: Boolean, default: false },
});

// Pre-save hook for conditional validation
paymentSchema.pre('save', function (next) {
  if (this.fieldType === 'fees' && !this.feeType) {
    // `this` refers to the current document
    next(new Error('feeType is required if fieldType is fees'));
  } else {
    next();
  }
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;
