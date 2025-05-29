'use client';

import { Navbar } from './ui/nav';

type Props = { children: React.ReactNode };

import {
  UsersIcon,
  MessageSquareWarning,
  Briefcase,
} from 'lucide-react';
import { Routes } from '@/types/routes';

export default function SideNavbar({ children }: Props) {
  return (
    <div>
      <Navbar
        links={[
          {
            title: 'Users',
            icon: <UsersIcon className="h-5 w-5" />,
            children: [
              { title: 'Workers management', href: Routes.WORKER_MANAGEMENT },
              {
                title: 'Businesses management',
                href: Routes.BUSINESS_MANAGEMENT,
              },
            ],
          },
          {
            title: 'Jobs',
            icon: <Briefcase className="h-5 w-5" />,
            children: [
              { title: 'Job management', href: Routes.JOB_MANAGEMENT },
            ],
          },
          {
            title: 'User Reports',
            icon: <MessageSquareWarning className="h-5 w-5" />,
            children: [
              {
                title: 'User Report management',
                href: Routes.USER_REPORT_MANAGEMENT,
              },
              {
                title: 'Post Reports management',
                href: Routes.POST_REPORT_MANAGEMENT,
              },
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
