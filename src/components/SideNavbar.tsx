"use client";

import { Navbar } from "./ui/nav";

type Props = { children: React.ReactNode };

import {
  UsersIcon,
  StickyNote,
  MessageSquareWarning,
} from "lucide-react";
import { Routes } from "@/types/routes";

export default function SideNavbar({ children }: Props) {
  return (
    <div>
      <Navbar
        links={[
          {
            title: "Users",
            icon: <UsersIcon className="h-5 w-5" />,
            children: [{ title: "User management", href: Routes.USER_MANAGEMENT }],
          },
          {
            title: "Posts",
            icon: <StickyNote className="h-5 w-5" />,
            children: [{ title: "Post management", href: Routes.POST_MANAGEMENT }],
          },
          {
            title: "User Reports",
            icon: <MessageSquareWarning className="h-5 w-5" />,
            children: [
              { title: "User Report management", href: Routes.USER_REPORT_MANAGEMENT },
              { title: "Post Reports management", href: Routes.POST_REPORT_MANAGEMENT  },
            ],
          },
          // {
          //   title: "Post Reports",
          //   icon: <MessageSquareWarning className="h-5 w-5" />,
          //   children: [
          //     { title: "Post Reports management", href: Routes.POST_MANAGEMENT },
          //   ],
          // },
        ]}
      >
        {children}
      </Navbar>
    </div>
  );
}
