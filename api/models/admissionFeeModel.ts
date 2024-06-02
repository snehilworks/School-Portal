import mongoose, { Schema, Document, Types } from "mongoose";

export interface AdmissionFees extends Document {
  classId: Types.ObjectId;
  class: string;
  amount: number;
}

const admissionfeeSchema: Schema = new Schema({
  classId: { type: Types.ObjectId, ref: 'Class', required: true },
  class: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default mongoose.model<AdmissionFees>("AdmissionFees", admissionfeeSchema);
