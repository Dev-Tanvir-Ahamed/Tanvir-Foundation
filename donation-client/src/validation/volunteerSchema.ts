import { z } from "zod";

// Define the validation schema
export const volunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  emergencyPhone: z
    .string()
    .min(10, "Emergency phone number must be at least 10 digits"),
  presentAddress: z.string().min(5, "Present address is required"),
  permenentAddress: z.string().min(5, "Permanent address is required"),
  education: z.string().min(2, "Educational information is required"),
  occupation: z.string().min(2, "Occupation is required"),
  volunteerFor: z
    .string()
    .min(3, "Please specify what you want to volunteer for"),
  specialSkills: z.string().optional(),
});
