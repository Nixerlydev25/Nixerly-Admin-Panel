"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/custom/datatable";
import { Filters } from "@/components/custom/filters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import { Separator } from "@/components/ui/separator";
import { CircleEllipsis, Router } from "lucide-react";
import { usePaginatedPostReports } from "@/services/postReports/postReports.hooks";
import EllipsisIcon from "@/components/custom/icons/elipsis";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostReportsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const { data, isFetching, error, refetch } = usePaginatedPostReports({
    page: currentPage,
    search: searchQuery,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    limit: itemsPerPage,
  });

  const totalCount = data?.totalCount || 0;

  const resetFilters = () => {
    setSearchQuery("");
    setDateRange({});
    setCurrentPage(1);
    refetch();
  };

  const router = useRouter()

  return (
    <div className="flex flex-col">
      {/* Page Title */}
      <div className="p-6">
        <PageTitle route="Reports" subRoute="Post Reports Management" />
      </div>

      {/* Separator */}
      <Separator className="h-[2px] w-full" />

      {/* Filters Section */}
      <Filters
      searchPlaceHolder="Search by title, username or reason"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        dateRange={{
          from: dateRange.startDate ? new Date(dateRange.startDate) : undefined,
          to: dateRange.endDate ? new Date(dateRange.endDate) : undefined,
        }}
        onDateRangeChange={(range) =>
          setDateRange({
            startDate: range?.from?.toISOString(),
            endDate: range?.to?.toISOString(),
          })
        }
        onResetFilters={resetFilters}
      />

      {/* Data Table Section */}
      <div className="p-6">
        {data?.data?.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <Image src="/no-data-found.webp" alt="No data found" width={200} height={200} className="mx-auto mb-4" />
            No data available
          </div>
        ) : (
          <DataTable
            data={data?.data || []}
            columns={[
              {
                key: "reporter",
                label: "Reporter",
              },
              {
                key: "reportedPost",
                label: "Reported Post",
              },
              {
                key: "reason",
                label: "Reason",
              },
              {
                key: "status",
                label: "Status",
                render: (report) => (
                  <span
                    className={`rounded px-2 py-1 ${
                      report.status === "Resolved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {report.status}
                  </span>
                ),
              },
              {
                key: "option",
                label: "Option",
              },
              {
                key: "createdDate",
                label: "Created Date",
                render: (report) =>
                  new Date(report.createdDate).toLocaleDateString(),
              },
            ]}
            totalCount={totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            isFetching={isFetching}
            renderRowActions={(report) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                  <EllipsisIcon width={24} height={24}  className="my-custom-class" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push(`/dashboard/post-report-management/${report.reportId}`)}
                  >
                    View
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => console.log("Delete", report)}
                  >
                    Delete
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default PostReportsManagement;
