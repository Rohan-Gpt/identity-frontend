import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  }),
  department: z.string().min(1, {
    message: "Department is required"
  }),
  semester: z.string().min(1, {
    message: "Semester is required"
  }),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  department: z.string().min(1, {
    message: "Department is required"
  }),
  semester: z.string().min(1, {
    message: "Semester is required"
  }),
});