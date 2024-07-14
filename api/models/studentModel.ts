import mongoose, { Schema, Document } from "mongoose";
import { string } from "zod";

export interface Student extends Document {
  name: string;
  email: string;
  password: string;
  phone: number;
  dob?: Date;
  gender?: string;
  guardianName?: string;
  guardianPhone?: number;
  class?: string;
  section?: string;
  admission: boolean;
  placeName?: string;
  address?: string;
}

const studentSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number },
  dob: { type: Date },
  gender: { type: String },
  guardianName: { type: String },
  guardianPhone: { type: Number },
  class: { type: String },
  section: { type: String },
  admission: { type: Boolean, default: false },
  placeName: {type : String },
  address : { type: String }
});

export default mongoose.model<Student>("Student", studentSchema);
