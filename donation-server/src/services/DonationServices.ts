import { IDonation } from "../interface/donation.interface";
import { Donation } from "../models/DonationModel";

export const createDonation = async (donationData: Partial<IDonation>) => {
  const donation = new Donation(donationData);
  return await donation.save();
};
