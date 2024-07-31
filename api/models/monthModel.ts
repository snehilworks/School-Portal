// monthModel.ts

import mongoose, { Schema, Document } from "mongoose";

interface IMonth extends Document {
  monthName: string;
  monthNumber: number;
}

const monthSchema: Schema = new Schema({
  monthName: { type: String, required: true, unique: true },
  monthNumber: { type: Number, required: true, unique: true },
});

const Month = mongoose.model<IMonth>("Month", monthSchema);

export default Month;
