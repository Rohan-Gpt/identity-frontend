"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export async function Register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password, department, semester } = validatedFields.data;

  try {
    // Simulate registration logic
    // In a real app, this would save to a database or API
    
    // Example validation - you can customize this logic
    if (email === "existing@example.com") {
      return { error: "An account with this email already exists." };
    } else if (name.length < 2) {
      return { error: "Name must be at least 2 characters long." };
    } else if (!email.includes("@")) {
      return { error: "Please enter a valid email address." };
    } else if (password.length < 6) {
      return { error: "Password must be at least 6 characters long." };
    } else if (department.length < 2) {
      return { error: "Please enter a valid department." };
    } else if (semester.length < 1) {
      return { error: "Please enter a valid semester." };
    } else {
      // Simulate successful registration
      return { success: "Registration successful! Your account has been created." };
    }
  } catch (error) {
    return { error: "Something went wrong during registration. Please try again." };
  }
}