import mongoose, { Schema, Document } from "mongoose";

export interface Admission extends Document {
  className: string;
  admissionSeatsAvail: number;
  admissionDate: Date;
}

// Define admission schema
const admissionSchema: Schema = new Schema({
  className: { type: String, ref: "Class", required: true },
  admissionSeatsAvail: { type: Number, required: true },
  admissionDate: { type: Date, default: Date.now },
});

export default mongoose.model<Admission>("Admission", admissionSchema);
