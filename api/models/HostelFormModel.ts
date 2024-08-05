import mongoose, { Schema, Document, Types } from "mongoose";

export interface HostelForm extends Document {
  studentName: string;
  studentId: string;
  class: Types.ObjectId;
  parentContact: string;
  joiningDate: Date;
  roomPreference: string;
  messFacilities: string;
  additionalNotes: string;
  review: boolean;
}

const hostelFormSchema: Schema = new Schema({
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  class: { type: Types.ObjectId, ref: 'Class', required: true }, // Reference to Class model
  parentContact: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  roomPreference: { type: String, enum: ['single', 'shared'], required: true },
  messFacilities: { type: String, required: true },
  additionalNotes: { type: String, default: '' },
  review: { type: Boolean, default: false },
});

export default mongoose.model<HostelForm>("HostelForm", hostelFormSchema);
