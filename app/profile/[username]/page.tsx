import BentoProfile from "@/components/minimal-profile/bento";
import { getUserData } from "@/utils/getUserData";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  if (username === undefined) {
    return (
      <div className="bg-black w-screen h-screen">
        <h1>User Profile</h1>
        {/* <BentoProfile /> */}
        <BentoProfile />
      </div>
    );
  }
  let userData: any = null;
  try {
    userData = await getUserData(
      Array.isArray(username) ? username[0] : username
    );
    console.log("User data fetched:", userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return (
    <div className="bg-black w-screen h-screen">
      <h1>User Profile</h1>
      {/* <BentoProfile /> */}
      {userData != null ? (
        <BentoProfile userData={userData.data} />
      ) : (
        <BentoProfile />
      )}
    </div>
  );
}
