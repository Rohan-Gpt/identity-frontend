"use client";
import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import axios from "axios";
import { Button } from "../ui/button";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function CodeChef({ data }: { data?: any }) {
  const [username, setUsername] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    async function fetchCodeChefData(codeChefUsername: string) {
      setLoading(true);
      try {
        const resp = await axios.post(
          `${BACKEND_URL}${API_BASE}/codechef`,
          { codeChefUsername },
          { withCredentials: true }
        );

        if (resp.status === 200) {
          console.log("CodeForces API Response:", resp.data);
          setApiResponse(resp.data);
        }
      } catch (error) {
        console.error("Error fetching CodeForces data:", error);
        // setApiResponse({
        //   error: "Failed to fetch data. Please try again later.",
        // });
      } finally {
        setLoading(false);
      }
    }
    fetchCodeChefData(username);
  }

  return (
    <Card className="w-full h-full bg-white p-8">
      <h2>CodeChef Profile</h2>
      <p>CodeChef Stats</p>
      {data || apiResponse != null ? (
        <pre>fetched data, see console logs </pre>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="CodeChef username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button variant={"outline"} className="bg-white" type="submit">
            Submit
          </Button>
        </form>
      )}
    </Card>
  );
}
