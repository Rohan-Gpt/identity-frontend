"use client";

import { Button } from "../ui/button";

export default function Social() {
  const onClick = (provider: "google" | "github") => {
    // For demo purposes, just show an alert
    alert(`Social login with ${provider} would be implemented here`);
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full hover:bg-blue-100 transition-all text-black"
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        📧 Google
      </Button>
      <Button
        size={"lg"}
        className="w-full hover:bg-blue-100 transition-all text-black"
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        🐙 Github
      </Button>
    </div>
  );
}
