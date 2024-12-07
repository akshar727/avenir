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
import { Label } from "@/components/ui/label";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function CollectionSwitcher({
  collections,
  onSelectCollection,
}: {
  collections: {
    name: string;
    date: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeCollection, setActiveCollection] = React.useState(
    collections[0]
  );

  const changeCollection = (collection: any) => {
    setActiveCollection(collection);
    onSelectCollection(collection.uuid);
  };

  const createCollection = () => {
    // TODO

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;

  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          {/* // open={uploadDialogOpen}
              // onOpenChange={setUploadDialogOpen} */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {/* <activeTeam.logo className="size-4" /> */}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeCollection.title}
                  </span>
                  <span className="truncate text-xs">
                    {activeCollection.location}
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
              <DropdownMenuItem className="gap-2 p-2">
                <DialogTrigger asChild>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <p className="font-inter">Add a collection</p>
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add collection</DialogTitle>
              <DialogDescription>
                Create a new collection to organize photos from a new journey!
              </DialogDescription>
            </DialogHeader>
            <div>
              <label htmlFor="name" className="font-inter">Trip Title</label>
              <Input id="name" />
              <br />
              <label htmlFor="location" className="font-inter">Trip Location</label>
              <Input id="location" />
            </div>
            <DialogFooter>
              <Button
                className="relative transition-all"
                onClick={() => createCollection()}
                type="submit"
              >
                Create collection
                {/* <LoadingCircle p={uploading} /> */}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
