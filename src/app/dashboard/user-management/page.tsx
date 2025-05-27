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
import { Checkbox } from "@/components/ui/checkbox";
import { useBlockUser, usePaginatedUser } from "@/services/user/user.hooks";
import { useRestrictionMutations } from "@/services/restrictions";
import { Restrictions } from "@/types/types";
import Image from "next/image";

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const { data, isFetching, error, refetch } = usePaginatedUser({
    page: currentPage,
    search: searchQuery,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    limit: itemsPerPage,
  });
  const { mutation, formStatus } = useBlockUser();

  const totalCount = data?.totalCount || 0;

  const resetFilters = () => {
    setSearchQuery("");
    setDateRange({});
    setCurrentPage(1);
    refetch();
  };

  const { addRestriction, removeRestriction } = useRestrictionMutations();

  const toggleRestriction = (
    userId: string,
    restrictionType: string,
    isRestricted: boolean,
  ) => {
    if (isRestricted) {
      removeRestriction.mutate({ userId, restrictionType });
    } else {
      addRestriction.mutate({ userId, restrictionType });
    }
  };

  console.log(data?.data, "data");

  return (
    <div className="flex flex-col">
      {/* Page Title */}
      <div className="p-6">
        <PageTitle route="Users" subRoute="User Management" />
      </div>

      {/* Separator */}
      <Separator className="h-[2px] w-full" />

      {/* Filters Section */}
      <Filters
        searchPlaceHolder="Search by username or email"
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
                key: "username",
                label: "Username",
              },
              {
                key: "email",
                label: "Email",
              },
              {
                key: "status",
                label: "Status",
                render: (user) => (
                  <span
                    className={`rounded px-2 py-1 ${
                      user.isSuspended
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.isSuspended ? "Suspended" : "Active"}
                  </span>
                ),
              },
              {
                key: "restrictions",
                label: "Restrictions",
                render: (user) => (
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={!user.canCreatePost}
                        onCheckedChange={() =>
                          toggleRestriction(
                            user.id,
                            Restrictions.CREATE_POST,
                            !user.canCreatePost,
                          )
                        }
                      />
                      Post
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={!user.canComment}
                        onCheckedChange={() =>
                          toggleRestriction(
                            user.id,
                            Restrictions.CREATE_COMMENT,
                            !user.canComment,
                          )
                        }
                      />
                      Comment
                    </label>
                  </div>
                ),
              },
            ]}
            totalCount={totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            isFetching={isFetching}
            renderRowActions={(user) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-ellipsis"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      mutation.mutate(user.id);
                    }}
                  >
                    {user?.isSuspended ? "Unblock" : "Block"}
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => console.log("Delete", user)}
                  >
                    Block
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

export default UserManagement;
