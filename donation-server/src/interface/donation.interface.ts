import mongoose from "mongoose";

export interface IDonation extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  createdBy: mongoose.Types.ObjectId; // Reference to Admin User
}
