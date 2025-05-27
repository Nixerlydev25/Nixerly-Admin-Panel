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
import {
  useDeleteUserReport,
  usePaginatedUserReports,
  useResolveUserReport,
} from "@/services/userReport/userReports.hooks";
import EllipsisIcon from "@/components/custom/icons/elipsis";
import Image from "next/image";
import { ReportStatus } from "@/types/types";
import { getStatusStyles } from "@/lib/utils";
import { useBlockUser } from "@/services/user/user.hooks";

const UserReportsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const { data, isFetching, error, refetch } = usePaginatedUserReports({
    page: currentPage,
    search: searchQuery,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    limit: itemsPerPage,
  });
  const { mutation: resolveReport } = useResolveUserReport();
  const { mutation: deleteReport } = useDeleteUserReport();
  const { mutation: blockUser, formStatus } = useBlockUser();

  const totalCount = data?.totalCount || 0;

  const resetFilters = () => {
    setSearchQuery("");
    setDateRange({});
    setCurrentPage(1);
    refetch();
  };

  return (
    <div className="flex flex-col">
      {/* Page Title */}
      <div className="p-6">
        <PageTitle route="Reports" subRoute="User Reports Management" />
      </div>

      {/* Separator */}
      <Separator className="h-[2px] w-full" />

      {/* Filters Section */}
      <Filters
        searchPlaceHolder="Search by username or title"
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
          <div className="py-4 text-center text-gray-500">
            <Image
              src="/no-data-found.webp"
              alt="No data found"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
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
                key: "reportedUser",
                label: "Reported User",
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
                    className={`rounded px-2 py-1 ${getStatusStyles(report.status)}`}
                  >
                    {report.status}
                  </span>
                ),
              },
              {
                key: "status",
                label: "Status",
                render: (report) => (
                  <span
                    className={`rounded px-2 py-1 ${
                      report.isSuspended
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {report.isSuspended ? "Suspended" : "Active"}
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
                    <EllipsisIcon
                      width={24}
                      height={24}
                      className="my-custom-class"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      blockUser.mutateAsync(report.reportedUserId);
                    }}
                  >
                      {report?.isSuspended ? "Unblock User" : "Block User"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      if (report.status === ReportStatus.RESOLVED) {
                        return;
                      }
                      resolveReport.mutateAsync(report.reportId);
                    }}
                  >
                    {report.status === ReportStatus.RESOLVED
                      ? "Already Resolved"
                      : "Resolved"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      deleteReport.mutateAsync(report.reportId);
                    }}
                  >
                    Delete Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default UserReportsManagement;
