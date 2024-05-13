import mongoose, { Schema, Document, Types } from "mongoose";

export interface Fees extends Document {
  class: Types.ObjectId; // Updated to store class ID
  description: string;
  amount: number;
}

const feeSchema: Schema = new Schema({
  class: { type: Types.ObjectId, ref: 'Class', required: true }, // Store class ID and reference the Class model
  description: { type: String, required: false },
  amount: { type: Number, required: true },
});

export default mongoose.model<Fees>("Fees", feeSchema);
