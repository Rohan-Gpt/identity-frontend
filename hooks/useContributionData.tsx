"use client";
import { useState, useEffect, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const WEBSOCKET_URL =
  process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:8787/api/v1/ws";

export function useContributionData(initialContributions: Contribution[] = []) {
  const [contributions, setContributions] =
    useState<Contribution[]>(initialContributions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(
      "Contributions effect is RUNNING AGAIN because the prop changed."
    );

    setContributions(initialContributions);
  }, [initialContributions]);

  const fetchContributions = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const year = new Date().getFullYear();
      const response = await axios.get(
        `${BACKEND_URL}${API_BASE}/contributions/combined/${year}`,
        { withCredentials: true }
      );
      const freshData = response.data.data.contributions;
      setContributions(freshData);
    } catch (err) {
      console.error("Failed to refetch contributions:", err);
      setError("Failed to update data.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, contributions]);

  const debouncedRefetch = useDebouncedCallback(fetchContributions, 500);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "contributions_updated") {
          console.log(
            "Contributions updated via WebSocket, triggering refetch."
          );
          debouncedRefetch();
        }
      } catch (err) {
        console.error("Failed to process WebSocket message:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("A real-time connection error occurred.");
    };

    return () => {
      console.log("Closing WebSocket connection.");
      ws.close();
    };
  }, [debouncedRefetch]);

  return { contributions, isLoading, error };
}
