import * as React from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Page() {
  const router = useRouter();
  const raw = router.asPath;
  const uuid = router.query.uuid;
  const token = router.asPath
    .replace("/shared/", "")
    .split("?access_token=")[1];
  const [sharedData, setSharedData] = React.useState({
    capsules: [],
  });
  React.useEffect(() => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

    if (!uuidRegex.test(uuid as string) || !jwtRegex.test(token)) {
      return;
    }
    async function fetchData() {
      console.log(uuid);
      console.log(token);
      const response = await axios({
        method: "get",
        url:
          process.env.NEXT_PUBLIC_BACKEND_URL +
          "auth/shared/view/" +
          uuid +
          "?access_token=" +
          token,
      });
      console.log(response.status);

      setSharedData(response.data);
    }
    fetchData().catch(function (error) {
      if (error.response) {
        if (error.response.status === 403) {
          alert("The access token is incorrect!");
          router.push("/");
          return;
        }
        if (error.response.status === 404) {
          alert("This shared capsule doesn't exist!");
          router.push("/");
          return;
        }
        if (error.response.status === 500) {
          alert("This shared capsule is private!");
          router.push("/");
          return;
        }
      }
    });
  }, [uuid, token]);
  return (
    <>

      <div className="ml-8 mt-2">
        <h1 className="text-3xl">{sharedData.title}</h1>
        <h2 className="text-xl">{sharedData.location}</h2>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {sharedData.capsules.length === 0 && (
            <p>
              This capsule doesn't seem to have any images! Check with the owner
              to make sure they added the images.
            </p>
          )}
          {sharedData.capsules.map((capsule) => (
            <div
              key={capsule.media}
              className="aspect-video rounded-xl bg-muted/50 overflow-hidden"
            >
              <img
                src={
                  "https://super-funicular-677w567j5vpcrgr6-8000.app.github.dev" +
                  capsule.media
                }
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
