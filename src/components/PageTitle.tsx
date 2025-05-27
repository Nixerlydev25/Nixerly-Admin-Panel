/** @format */

import { cn } from "@/lib/utils";
import { ChevronsRight, GalleryHorizontalEnd } from "lucide-react";
import React from "react";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  route: string;
  subRoute: string;
  className?: string;
};

export default function PageTitle({ route, subRoute, className }: Props) {
  return (
    <div className="flex items-center">
      {/* <ChevronsRight className="text-gray-600" /> */}
      {/* <Separator orientation="vertical" className="mx-4 h-5 bg-gray-400" /> */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard" className="text-base font-light">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-base font-light">
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-base">
              {subRoute}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
