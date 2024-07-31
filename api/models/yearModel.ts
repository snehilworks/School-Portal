import mongoose, { Schema, Document } from "mongoose";

interface IYear extends Document {
  year: number;
}

const yearSchema: Schema = new Schema({
  year: {
    type: Number,
    required: true,
    unique: true,
  },
});

const yearModel = mongoose.model<IYear>("Year", yearSchema);

export default yearModel;
