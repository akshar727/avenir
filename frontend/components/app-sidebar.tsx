import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  Cog,
  Share,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { CollectionSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { on } from "events";
import axios from "axios";

// This is sample data.

export function AppSidebar(props: any) {
  const data = {
    projects: [
      {
        name: "Collection Settings",
        url: "#",
        icon: Cog,
      },
      {
        name: "Get Sharable Link",
        url: "#",
        icon: Share,
        clickCallback: async (e: any) => {
          e.preventDefault();
          const response = await axios({
            method: "POST",
            url:
              process.env.NEXT_PUBLIC_BACKEND_URL +
              "auth/shared/generate/" +
              props.currentCollection.uuid,
            headers: { Authorization: "Bearer " + props.session?.access_token },
          });
          const data = response.data;
          console.log(process.env.AVENIR_FRONTEND_URL);
          props.shareUrl(
            "https://super-funicular-677w567j5vpcrgr6-3000.app.github.dev" +
              "/shared/" +
              data.uuid +
              "?access_token=" +
              data.token
          );
          props.copyOpenChange(true);
        },
      },
    ],
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <CollectionSwitcher
          onSelectCollection={props.onSelectCollection}
          collections={props.collections}
          session={props.session}
          currentCollection={props.currentCollection}
        />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} session={props.session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
