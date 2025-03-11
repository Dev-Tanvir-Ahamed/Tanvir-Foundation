"use client";

import { useInitialDonationMutation } from "@/redux/api/baseApi";
import {
  donationFailure,
  donationSuccess,
  setFormData,
  startDonation,
} from "@/redux/features/donation/donationSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Input, message, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Button } from "./ui/button";

type FormValues = {
  category: string;
  email: string;
  amount: string;
};

export default function DonationCardForm() {
  const [initiateDonation] = useInitialDonationMutation();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: undefined,
      email: "",
      amount: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Get userId from localStorage
    const userId = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).id
      : null;

    const donationData = {
      ...data,
      amount: parseFloat(data.amount), // Convert amount to number
      userId,
      name: null,
    };

    dispatch(startDonation());

    try {
      const response = await initiateDonation(donationData).unwrap();

      if (response.redirectUrl) {
        dispatch(donationSuccess());
        dispatch(setFormData(data));
        message.success("Redirecting to payment...");
        window.location.href = response.redirectUrl; // Redirect to SSLCommerz
      }
    } catch (err) {
      console.log(err);
      dispatch(donationFailure("Payment initiation failed"));
      message.error("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm dark:shadow-sm border border-gray-200 dark:border-gray-700">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6 items-center justify-center"
        >
          {/* Donation Fund Select */}
          <div className="relative w-full md:w-64">
            <Controller
              name="category"
              control={control}
              rules={{ required: "Please select a donation fund" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select Fund"
                  className="w-full text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  status={errors.category ? "error" : ""}
                  options={[
                    { value: "general", label: "General Fund" },
                    { value: "education", label: "Education Fund" },
                    { value: "healthcare", label: "Healthcare Fund" },
                    { value: "environment", label: "Environment Fund" },
                  ]}
                />
              )}
            />
            {errors.category && (
              <p className="absolute top-full left-0 text-red-500 text-sm mt-1 dark:text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Contact Info Input */}
          <div className="relative w-full md:w-64">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value:
                    /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})|(\d{10})$/,
                  message: "Please enter a valid email or phone number",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Email"
                  className="w-full text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                  status={errors.email ? "error" : ""}
                />
              )}
            />
            {errors.email && (
              <p className="absolute top-full left-0 text-red-500 text-sm mt-1 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Donation Amount Input */}
          <div className="relative w-full md:w-64">
            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Please enter a valid amount",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Donation Amount"
                  className="w-full text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                  status={errors.amount ? "error" : ""}
                />
              )}
            />
            {errors.amount && (
              <p className="absolute top-full left-0 text-red-500 text-sm mt-1 dark:text-red-400">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full md:w-auto flex justify-center">
            <Button
              type="submit"
              className="px-6 py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white dark:text-gray-900 transition"
            >
              Donate
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
