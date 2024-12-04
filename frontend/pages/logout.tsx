import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  signOut({ callbackUrl: "/" }).then(() => {
    router.push("/");
  });
  return <></>;
}
