"use client";
import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import axios from "axios";
import { Button } from "../ui/button";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function CodeForces({ data }: { data?: any }) {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <Card className="w-full h-full bg-white p-8">
      <h2>Github Profile</h2>
      <p>Github Stats</p>
      {data || apiResponse != null ? (
        <pre>fetched data, see console logs </pre>
      ) : (
        <a href="">
          <Button variant={"outline"} className="bg-white">
            Connect to Github
          </Button>
        </a>
      )}
    </Card>
  );
}
