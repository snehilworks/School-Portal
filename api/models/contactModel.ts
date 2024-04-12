import mongoose, { Schema, Document } from "mongoose";

export interface ContactMessage extends Document {
  name: string;
  email: string;
  message: string;
}

const ContactMessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

export default mongoose.model<ContactMessage>(
  "ContactMessage",
  ContactMessageSchema,
  "contact_message"
);
