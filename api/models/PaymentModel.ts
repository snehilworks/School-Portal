import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  orderId: string;
  paymentId: string;
  studentId?: mongoose.Schema.Types.ObjectId;
  studentName: string;
  fieldType: "ADMISSION" | "FEES" | "HOSTEL";
  feeType?: "ANNUAL" | "6-MONTH" | "MONTHLY";
  studentClass: mongoose.Schema.Types.ObjectId;
  amount: number;
  paymentStatus: string;
  paymentDate: Date;
  review: boolean;
}

const paymentSchema: Schema = new Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  studentName: { type: String, required: true },
  fieldType: {
    type: String,
    required: true,
    enum: ["ADMISSION", "FEES", "HOSTEL"],
  },
  feeType: {
    type: String,
    enum: ["ANNUAL", "6-MONTH", "MONTHLY"],
  },
  studentClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  review: { type: Boolean, default: false },
});

// Pre-save hook to calculate endDate
paymentSchema.pre("save", function (next) {
  if (this.fieldType === "FEES" && this.feeType) {
    const paymentDate =
      this.paymentDate instanceof Date ? this.paymentDate : new Date();
  
    let endDate = new Date(paymentDate.getTime());

    switch (this.feeType) {
      case "ANNUAL":
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      case "6-MONTH":
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case "MONTHLY":
        endDate.setMonth(endDate.getMonth() + 1);
        break;
    }

    this.endDate = endDate;
  }

  next();
});
const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;
