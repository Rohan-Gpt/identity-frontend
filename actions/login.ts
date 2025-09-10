"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

export async function Login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    // Simulate authentication logic
    // In a real app, this would check against a database or API
    
    console.log("Login attempt:", { email, password }); // Debug log
    
    // Example validation - you can customize this logic
    if (email === "test@example.com" && password === "password") {
      return { success: "Login successful! Welcome back." };
    } else if (!email.includes("@")) {
      return { error: "Please enter a valid email address." };
    } else if (password.length < 6) {
      return { error: "Password must be at least 6 characters long." };
    } else {
      return { error: "Invalid email or password. Please try again." };
    }
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
}