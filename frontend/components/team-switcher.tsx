import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingCircle } from "@/components/LoadingCircle";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import axios from "axios";

export function CollectionSwitcher({
  collections,
  onSelectCollection,
  session,
  currentCollection,
}: {
  collections: {
    title: string;
    location: string;
    uuid: string;
  }[];
  onSelectCollection: (uuid: string) => void;
  session: any;
  currentCollection: any;
}) {
  const { isMobile } = useSidebar();
  const [activeCollection, setActiveCollection] =
    React.useState(currentCollection);
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [creating, setCreating] = React.useState(false);

  const changeCollection = (collection: any) => {
    setActiveCollection(collection);
    onSelectCollection(collection.uuid);
  };

  const createCollection = async () => {
    setCreating(true);
    console.log(name, location);
    const data = {
      title: name,
      location: location,
    };
    // send the data as a post to /api/auth/collections/
    // then get the new collection data and set it as the active
    // collection
    const response = await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/collections/",
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
      data: data,
    });
    console.log(response.data);
    changeCollection(response.data);
    collections.push(response.data);
    setCreating(false);
    setOpen(false);
  };

  React.useEffect(() => {
    setActiveCollection(currentCollection);
  }, [currentCollection]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"></div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeCollection.title ?? "No collection"}
                  </span>
                  <span className="truncate text-xs">
                    {activeCollection.location ?? "No location"}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Collections
              </DropdownMenuLabel>
              {collections.map((collection, index) => (
                <DropdownMenuItem
                  key={collection.title}
                  onClick={() => changeCollection(collection)}
                  className="gap-2 p-2"
                >
                  {collection.title}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className="gap-2 p-2">
                  {/* <DialogTrigger asChild> */}
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  {/* </DialogTrigger>
                <DialogTrigger asChild> */}
                  <p className="font-inter">Add a collection</p>
                  {/* </DialogTrigger> */}
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add collection</DialogTitle>
              <DialogDescription>
                Create a new collection to organize photos from a new journey!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap gap-y-2">
              <label htmlFor="name" className="font-inter">
                Trip Title
              </label>
              <Input id="name" onChange={(e) => setName(e.target.value)} />
              <br />
              <label htmlFor="location" className="font-inter">
                Trip Location
              </label>
              <Input
                id="location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                className="relative transition-all"
                onClick={() => createCollection()}
                type="button"
                disabled={
                  creating ||
                  !name.replace(/\s+/, "") ||
                  !location.replace(/\s+/, "")
                }
              >
                Create collection
                <LoadingCircle p={creating} />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
