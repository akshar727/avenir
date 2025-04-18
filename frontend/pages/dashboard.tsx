import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Copy, Heart } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { addDays, format } from "date-fns";
import { useSession, signOut } from "next-auth/react";
import { HTMLAttributes, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { LoadingCircle } from "@/components/LoadingCircle";
import { DatePickerWithRange } from "@/components/team-switcher";

export default function Page() {
  const { data: session, status } = useSession({ required: true });
  interface User {
    name: string;
    email: string;
  }

  interface Collection {
    uuid: string;
    title: string;
  }

  interface Formatted {
    user: User;
    collections: Collection[];
  }

  const [formatted, setFormatted] = useState<Formatted | "unset">("unset");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copyOpen, setCopyOpen] = useState(false);
  const [changedName, setChangedName] = useState("");
  const [changedLocation, setChangedLocation] = useState("");
  interface Capsule {
    media: string;
  }
  const [currentCollectionData, setCurrentCollectionData] = useState({
    capsules: [],
  });
  const getUserDetails = async () => {
    // try {
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
    if (collections.length > 0) {
      getCollectionData(collections[0].uuid);
    }
    // } catch (error) {
    //   alert(error.message);
    //   // signOut({ callbackUrl: "/login" });
    // }
    return Promise.resolve();
  };
  const getCollectionData = async (uuid: string) => {
    // try {
    const response = await axios({
      method: "get",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/capsules/" + uuid,
      headers: { Authorization: "Bearer " + session?.access_token },
    });
    setCurrentCollectionData(response.data);
    setChangedName(response.data.title);
    setChangedLocation(response.data.location);
  };

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
        onUploadProgress: (data) => {
          console.log(data.loaded);
          console.log(data.total);
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });
      console.log(response.data);
      getCollectionData(currentCollectionData.uuid);
      setUploadDialogOpen(false);
      setUploading(false);
      setProgress(0);
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
  const [filesSelected, setFilesSelected] = useState<number>(0);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [changeOpen, setChangeOpen] = useState(false);

  return (
    <SidebarProvider>
      {formatted !== "unset" && (
        <AppSidebar
          onSelectCollection={setCollection}
          user={formatted.user}
          collections={formatted.collections}
          currentCollection={currentCollectionData}
          session={session}
          copyOpen={copyOpen}
          copyOpenChange={setCopyOpen}
          changeOpen={changeOpen}
          changeOpenChange={setChangeOpen}
          shareUrl={setShareUrl}
        />
      )}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex justify-between flex-1 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className={
                  "mr-2 h-4 " +
                  (formatted.collections?.length === 0 ? "hidden" : "")
                }
              />
              <Breadcrumb
                className={formatted.collections?.length === 0 ? "hidden" : ""}
              >
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage>
                      {currentCollectionData.title}
                    </BreadcrumbPage>
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
                <Button disabled={formatted.collections?.length === 0}>
                  Add more photos
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add photos</DialogTitle>
                  <DialogDescription>
                    Add any photos that you want to put into this collection.
                    Press upload to add them to the collection. (Max 9MB total)
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <Input
                    multiple={true}
                    accept={"image/*,video/*"}
                    id="picture"
                    type="file"
                    onChange={(e) => setFilesSelected(e.target.files.length)}
                  />
                </div>
                <DialogFooter>
                  <Button
                    className="relative transition-all"
                    onClick={() => uploadFiles()}
                    type="submit"
                    disabled={uploading || filesSelected === 0}
                  >
                    Upload files
                    {uploading && " " + progress + "%"}
                    <LoadingCircle p={uploading} />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {formatted.collections?.length === 0 && (
              <p>
                You don't have any collections.. yet! Use the dropdown in the
                top left (the black box) to create one!
              </p>
            )}
            {currentCollectionData.capsules.map((capsule) => (
              <div
                key={capsule.media}
                className="relative aspect-video group rounded-xl bg-muted/50 overflow-hidden"
              >
                {!capsule.media.includes(".mp4") && (
                  <img
                    src={
                      "https://super-funicular-677w567j5vpcrgr6-8000.app.github.dev" +
                      capsule.media
                    }
                    loading="lazy"
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
                {capsule.media.includes(".mp4") && (
                  <video
                    src={
                      "https://super-funicular-677w567j5vpcrgr6-8000.app.github.dev" +
                      capsule.media
                    }
                    className="w-full h-full object-cover rounded-xl"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                )}
                {/* <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 bg-white rounded-full shadow">
                    <Heart className="w-6 h-6 text-red-500" />
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
        <Dialog open={copyOpen} onOpenChange={setCopyOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this. This link
                expires in one week.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <label htmlFor="link" className="sr-only">
                  Link
                </label>
                <Input id="link" value={shareUrl} readOnly />
              </div>
              <Button
                onClick={async () => {
                  await navigator.clipboard.writeText(shareUrl);
                }}
                type="button"
                size="sm"
                className="px-3"
              >
                <span className="sr-only">Copy</span>
                <Copy />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Sheet open={changeOpen} onOpenChange={setChangeOpen}>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Edit collection</SheetTitle>
              <SheetDescription>
                Make changes to your collection here. Click save when you're
                done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <label htmlFor="name" className="font-inter">
                Trip Title
              </label>
              <Input
                id="name"
                value={changedName}
                onChange={(e) => setChangedName(e.target.value)}
              />
              <br />
              <label htmlFor="location" className="font-inter">
                Trip Location
              </label>
              <Input
                id="location"
                value={changedLocation}
                onChange={(e) => setChangedLocation(e.target.value)}
              />
              <label htmlFor="date" className="font-inter">
                Trip Dates
              </label>
              <DatePickerWithRange />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={()=> alert("Sorry, this is a work in progress and therefore hasn't been made!")} type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
