import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function getUserData(profileUsername: string) {
  const response = await axios.get(
    `${BACKEND_URL}${API_BASE}/all/${profileUsername}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
