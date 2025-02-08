import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob?: Date;
  gender?: string;
  fatherName?: string;
  fatherPhone?: string;
  motherName?: string;
  motherPhone?: string;
  class?: Types.ObjectId;
  section?: string;
  admission: boolean;
  placeName?: string;
  address?: string;
  aadharNumber?: string;
  previousSchoolTC?: string | null;
}

const studentSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  dob: { type: Date },
  gender: { type: String },
  fatherName: { type: String },
  fatherPhone: { type: String }, 
  motherName: { type: String },
  motherPhone: { type: String }, 
  class: { type: Types.ObjectId, ref: "Class" },
  section: { type: String },
  admission: { type: Boolean, required: true, default: false },
  placeName: { type: String },
  address: { type: String },
  aadharNumber: { type: String, unique: true },
  previousSchoolTC: { type: String, default: null },
});

export default mongoose.model<IStudent>("Student", studentSchema);
