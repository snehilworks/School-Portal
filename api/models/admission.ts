import mongoose, { Schema, Document, Types } from "mongoose";

export interface Admission extends Document {
  studentName: string;
  fatherName: string;
  motherName: string;
  class: Types.ObjectId;
  fatherPhone: string;
  gender: string;
  email: string;
  address: string;
  review: boolean;
}

const admissionSchema: Schema = new Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  class: { type: Types.ObjectId, ref: 'Class', required: true }, // Reference to Class model
  fatherPhone: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  review: { type: Boolean, default: false },
});

export default mongoose.model<Admission>("Admission", admissionSchema);
