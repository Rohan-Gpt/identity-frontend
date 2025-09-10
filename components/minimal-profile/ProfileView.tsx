"use client";

import { useState } from "react";
import BentoProfile from "./bento";
import { NewUserCTA } from "./NewUserCTA";
import { useContributionData } from "../../hooks/useContributionData";

export default function ProfileView({ initialData }: { initialData?: any }) {
  const [platformData, setPlatformData] = useState(
    initialData?.data?.platformData ?? null
  );
  
  // Use the useContributionData hook for contribution management
  const { contributions, isLoading, error } = useContributionData(
    initialData?.data?.contributions ?? []
  );

  const hasData = initialData.success;

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
