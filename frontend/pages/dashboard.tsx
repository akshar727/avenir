import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { LoadingCircle } from "@/components/LoadingCircle";

export default function Page() {
  const { data: session, status } = useSession({ required: true });
  const [formatted, setFormatted] = useState("unset");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  interface Capsule {
    media: string;
  }
  const [currentCollectionData, setCurrentCollectionData] = useState({
    capsules: [],
  });
  const getUserDetails = async () => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/user/",
        headers: { Authorization: "Bearer " + session?.access_token },
      });
      var raw_data = JSON.parse(JSON.stringify(response.data));
      var user = {
        name: raw_data.first_name + " " + raw_data.last_name,
        email: raw_data.email,
      };
      var collections = raw_data.collections;
      let formatted = {
        user: user,
        collections: collections,
      };
      setFormatted(formatted);
      getCollectionData(formatted.collections[0].uuid);
    } catch (error) {
      // signOut({ callbackUrl: "/login" });
    }
    return Promise.resolve();
  };
  const getCollectionData = async (uuid: string) => {
    console.log(uuid);
    try {
      const response = await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/capsules/" + uuid,
        headers: { Authorization: "Bearer " + session?.access_token },
      });
      setCurrentCollectionData(response.data);
    } catch (error) {
      // setCurrentCollectionData(error.message);
      // signOut({ callbackUrl: "/login" });
    }
  };
  // const data = {
  //   user: {
  //     name: "Akshar Desai",
  //     email: "akshar727@gmail.com",
  //     avatar: "/avatars/shadcn.jpg",
  //   },
  //   collections: [
  //     {
  //       name: "Puerto Rico",
  //       logo: GalleryVerticalEnd,
  //       date: "2024",
  //     },
  //     {
  //       name: "Hawaii",
  //       logo: AudioWaveform,
  //       date: "July 2023",
  //     },
  //     {
  //       name: "France",
  //       logo: Command,
  //       date: "April 2022",
  //     },
  //   ],
  //   navMain: [
  //     {
  //       title: "Playground",
  //       url: "#",
  //       icon: SquareTerminal,
  //       isActive: true,
  //       items: [
  //         {
  //           title: "History",
  //           url: "#",
  //         },
  //         {
  //           title: "Starred",
  //           url: "#",
  //         },
  //         {
  //           title: "Settings",
  //           url: "#",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Models",
  //       url: "#",
  //       icon: Bot,
  //       items: [
  //         {
  //           title: "Genesis",
  //           url: "#",
  //         },
  //         {
  //           title: "Explorer",
  //           url: "#",
  //         },
  //         {
  //           title: "Quantum",
  //           url: "#",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Documentation",
  //       url: "#",
  //       icon: BookOpen,
  //       items: [
  //         {
  //           title: "Introduction",
  //           url: "#",
  //         },
  //         {
  //           title: "Get Started",
  //           url: "#",
  //         },
  //         {
  //           title: "Tutorials",
  //           url: "#",
  //         },
  //         {
  //           title: "Changelog",
  //           url: "#",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Settings",
  //       url: "#",
  //       icon: Settings2,
  //       items: [
  //         {
  //           title: "General",
  //           url: "#",
  //         },
  //         {
  //           title: "Team",
  //           url: "#",
  //         },
  //         {
  //           title: "Billing",
  //           url: "#",
  //         },
  //         {
  //           title: "Limits",
  //           url: "#",
  //         },
  //       ],
  //     },
  //   ],
  // };

  useEffect(() => {
    if (session?.access_token !== undefined) {
      getUserDetails();
    }
  }, [session?.access_token]);
  const [uploading, setUploading] = useState(false);
  const uploadFiles = async () => {
    setUploading(true);
    const formData = new FormData();
    var fileInput = document.getElementById("picture") as HTMLInputElement;
    if (fileInput.files !== null) {
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append("media", fileInput.files[i]);
      }
    }
    try {
      const response = await axios({
        method: "put",
        url:
          process.env.NEXT_PUBLIC_BACKEND_URL +
          "auth/capsules/" +
          currentCollectionData.uuid,
        headers: {
          Authorization: "Bearer " + session?.access_token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      console.log(response.data);
      getCollectionData(currentCollectionData.uuid);
      setUploadDialogOpen(false);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
      setUploadDialogOpen(false);
      alert(error);
    }
  };

  const setCollection = (uuid: string) => {
    console.log("collection changed");
    getCollectionData(uuid);
  };

  return (
    <SidebarProvider>
      {formatted !== "unset" && (
        <AppSidebar
          onSelectCollection={setCollection}
          user={formatted.user}
          collections={formatted.collections}
        />
      )}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex justify-between flex-1 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage>{currentCollectionData.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>All Photos</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add more photos</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add photos</DialogTitle>
                  <DialogDescription>
                    Add any photos that you want to put into this collection.
                    Press upload to add them to the collection.
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <Input multiple={true} id="picture" type="file" />
                </div>
                <DialogFooter>
                  <Button
                    className="relative transition-all"
                    onClick={() => uploadFiles()}
                    type="submit"
                  >
                    Upload files
                    <LoadingCircle p={uploading} />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {currentCollectionData.capsules.map((capsule) => (
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
      </SidebarInset>
    </SidebarProvider>
  );
}
