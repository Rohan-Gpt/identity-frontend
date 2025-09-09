import BentoProfile from "@/components/minimal-profile/bento";
import ProfileView from "@/components/minimal-profile/ProfileView";
import { getUserData } from "@/utils/getUserData";
import { cookies } from "next/headers"; // Import the cookies function

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  if (username === undefined) {
    return (
      <div className="bg-black w-screen h-screen">
        <h1 className="text-white text-9xl">404</h1>
      </div>
    );
  }
  let codingPlatformData: any = null;
  try {
    const cookieStore = await cookies();
    codingPlatformData = await getUserData(
      Array.isArray(username) ? username[0] : username,
      cookieStore
    );
    console.log("User data fetched:", codingPlatformData);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return (
    <div className="bg-black w-screen h-screen">
      <h1>User Profile</h1>
      {/* <BentoProfile /> */}
      <ProfileView initialData={codingPlatformData} />
    </div>
  );
}
