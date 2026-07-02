import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  userId: string;
  photo?: string;
  tags?: string[];
  phone?: string;
  address?: string;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: String, required: true },
  photo: { type: String },
  tags: { type: [String] },
  phone: { type: String },
  address: { type: String },
});

export default mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);
