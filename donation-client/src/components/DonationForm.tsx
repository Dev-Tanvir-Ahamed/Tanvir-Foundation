import { useInitialDonationMutation } from "@/redux/api/baseApi";

import {
  donationFailure,
  donationSuccess,
  setFormData,
  startDonation,
} from "@/redux/features/donation/donationSlice";
import { useAppDispatch } from "@/redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Inputs = {
  amount: number;
  name: string;
  email: string;
};

const DonationForm = () => {
  const [initiateDonation] = useInitialDonationMutation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Get the userId from localStorage (assuming it's stored there upon login)
    const userId = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).id
      : null; // Default to null if no user is logged in
    // Include userId in the form data
    const donationData = {
      ...data,
      amount: parseFloat(data.amount.toString()), // Convert to number
      userId, // Attach the userId to the data
    };
    console.log(donationData);

    dispatch(startDonation());

    try {
      const response = await initiateDonation(donationData).unwrap();
      if (response.redirectUrl) {
        dispatch(donationSuccess());
        dispatch(setFormData(data));
        // Redirect the user to SSLCommerz payment page
        window.location.href = response.redirectUrl;
      }
    } catch (err) {
      console.log(err);
      dispatch(donationFailure("Payment initiation failed"));
    }
  };

  return (
    <div className="dark:bg-dark-background dark:text-dark-text">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <div className="flex">
            <Label htmlFor="amount" className="text-[18px] w-60">
              Donation Amount:{" "}
            </Label>
            <Input
              type="number"
              id="amount"
              {...register("amount", { required: true })}
            />
          </div>
          <div className="flex">
            <Label htmlFor="DonarName" className="text-[18px] w-60">
              Donar Name:{" "}
            </Label>
            <Input
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex">
            <Label htmlFor="gmail" className="text-[18px] w-60">
              Email :{" "}
            </Label>
            <Input
              type="text"
              id="phone"
              {...register("email", { required: true })}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button className="px-8" type="submit">
            Donate
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;
