import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import * as React from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [green, setGreen] = React.useState(false);

  if (status == "loading") {
    return <p>Loading...</p>;
  }

  // If the user is authenticated redirect to `/profile`
  if (session) {
    router.push("profile");
    return;
  }

  return (
    <div>
      <Button
        className={green ? "bg-green-500" : "bg-red-500"}
        onClick={() => setGreen(!green)}
      ></Button>
    </div>
  );
}
