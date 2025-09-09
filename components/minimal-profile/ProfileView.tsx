"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import BentoProfile from "./bento";
import { NewUserCTA } from "./NewUserCTA";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const WEBSOCKET_URL =
  process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:8787/api/v1/ws";

export default function ProfileView({ initialData }: { initialData?: any }) {
  const [platformData, setPlatformData] = useState(
    initialData?.data?.platformData ?? null
  );
  const [contributions, setContributions] = useState(
    initialData?.data?.contributions ?? []
  );
  const [isLoading, setIsLoading] = useState(false);

  const debouncedRefetch = useDebouncedCallback(async () => {
    setIsLoading(true);
    try {
      const year = new Date().getFullYear();
      const response = await axios.get(
        `${BACKEND_URL}${API_BASE}/contributions/combined/${year}`,
        { withCredentials: true }
      );

      if (response.data.success && response.data.data) {
        const freshData = response.data.data.contributions;
        setContributions(freshData);
      }
    } catch (err) {
      console.error("Failed to refetch user data:", err);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  useEffect(() => {
    console.log("Establishing WebSocket connection...");
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => console.log("WebSocket connection established.");
    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("WebSocket connection closed.");

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "contributions_updated") {
          console.log("Update received via WebSocket, triggering refetch.");
          debouncedRefetch();
        }
      } catch (err) {
        console.error("Failed to process WebSocket message:", err);
      }
    };

    return () => {
      ws.close();
    };
  }, [debouncedRefetch]);

  const hasData = initialData.success;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasData) {
    console.log("this is the hasData block", hasData);
    return (
      <BentoProfile
        platformData={platformData}
        contributions={contributions}
        isLoading={isLoading}
      />
    );
  } else {
    console.log("this is the hasData block", hasData);

    return <NewUserCTA />;
  }
}
