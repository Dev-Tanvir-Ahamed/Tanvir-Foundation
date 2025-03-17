import { Request, Response } from "express";
import { Types } from "mongoose";
import { IDonation } from "../interface/donation.interface";
import { createDonation } from "../services/DonationServices";

export const createDonationController = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  // Explicitly return Promise<void>
  try {
    const { title, description, image, category } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: User not authenticated" });
      return; // Don't return the response
    }

    const adminId = req.user?._id;

    if (req.user?.role !== "admin") {
      res
        .status(403)
        .json({ message: "Unauthorized: Only admin can create donations" });
      return; // Don't return the response
    }

    const donation: Partial<IDonation> = {
      title,
      description,
      image,
      category,
      createdBy: new Types.ObjectId(adminId),
    };
    const newDonation = await createDonation(donation);

    res.status(201).json({
      message: "Donation created successfully",
      donation: newDonation,
    });
    // No return statement here
  } catch (error) {
    res.status(500).json({ message: "Error creating donation", error });
    // No return statement here
  }
};
