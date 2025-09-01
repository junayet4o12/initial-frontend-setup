import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().nonempty({ message: "Old Password cannot be empty" }),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
// Define the schema
export const signupSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string(),
  address: z.string().min(1, "Address is required"),
});
