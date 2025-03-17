import mongoose, { Schema } from "mongoose";
import { IDonation } from "../interface/donation.interface";

const DonationSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Only Admins
  },
  { timestamps: true }
);

export const Donation = mongoose.model<IDonation>("Donation", DonationSchema);
