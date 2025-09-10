"use server";

import * as z from "zod";
import { ProfileSchema } from "@/schemas";

export async function GetUser(username: string) {
  try {
    // Simulate getting user data
    // In a real app, this would fetch from a database or API
    return {
      name: "Sample User",
      email: "user@example.com",
      department: "Computer Science",
      semester: "6"
    };
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
}

export async function updateUser(values: z.infer<typeof ProfileSchema>) {
  const validatedFields = ProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    // Simulate updating user profile
    // In a real app, this would update the database or API
    return { success: "Profile updated successfully!" };
  } catch (error) {
    return { error: "Something went wrong while updating profile." };
  }
}