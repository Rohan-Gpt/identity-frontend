import axios from "axios";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// Update the function to accept the cookie store
export async function getUserData(
  profileUsername: string,
  cookies: ReadonlyRequestCookies
) {
  try {
    // Extract the cookie string
    const cookieString = cookies
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await axios.get(
      `${BACKEND_URL}${API_BASE}/all/${profileUsername}`,
      {
        // Pass the cookies in the headers
        headers: {
          Cookie: cookieString,
        },
        withCredentials: true, // Keep this for any client-side calls if needed
      }
    );
    // if (response.data.success === false) {
    //   throw new Error("Failed to fetch user data");
    // }
    return response.data;
  } catch (err) {
    // The error object from axios is more detailed, let's not hide it.
    console.error("Error details from getUserData:", err);
    // Re-throw the error so the calling component knows it failed.
    throw err;
  }
}
