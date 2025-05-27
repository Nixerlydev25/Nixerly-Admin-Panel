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
import { usePaginatedPosts } from "@/services/post";
import EllipsisIcon from "@/components/custom/icons/elipsis";
import { useRouter } from "next/navigation";
import { useBlockPost } from "@/services/postReports/postReports.hooks";
import Image from "next/image";

const PostManagement: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const { data, isFetching, error, refetch } = usePaginatedPosts({
    page: currentPage,
    search: searchQuery,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    limit: itemsPerPage,
  });

  const { mutation, formStatus } = useBlockPost();
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
        <PageTitle route="Posts" subRoute="Post Management" />
      </div>

      {/* Separator */}
      <Separator className="h-[2px] w-full" />

      {/* Filters Section */}
      <Filters
        searchPlaceHolder="Search by Username or Email"
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
                key: "title",
                label: "Title",
              },
              {
                key: "author",
                label: "Author",
                render: (post) => (
                  <div>
                    <p>{post.author.username}</p>
                    <p className="text-xs text-gray-500">{post.author.email}</p>
                  </div>
                ),
              },
              {
                key: "country",
                label: "Country",
              },
              {
                key: "likes",
                label: "Likes",
              },
              {
                key: "numberOfReports",
                label: "Reports",
              },
              {
                key: "images",
                label: "Images",
                render: (post) => (
                  <div>
                    {post.images.map((image, index) => (
                      <p key={index} className="flex flex-wrap gap-2">
                        {/* <span className="font-bold">Image ID:</span> {image.id} */}
                        {image.hasSensitiveContent && (
                          <span className={`rounded bg-red-100 px-2 py-1`}>
                            ( {index + 1} Sensitive)
                          </span>
                        )}
                        {image.hasExplicitContent && (
                          <span
                            className={`text-black-600 rounded bg-orange-200 px-2 py-1`}
                          >
                            ({index + 1} Explicit)
                          </span>
                        )}
                      </p>
                    ))}
                  </div>
                ),
              },
              {
                key: "sensitiveMeta",
                label: "Sensitive Keywords",
                render: (post) => (
                  <>
                    <p className="flex flex-wrap gap-2">
                      {post.sensitiveMeta && post.sensitiveMeta.length > 0 &&
                        post.sensitiveMeta
                          .slice(0, 4)
                          .map((meta, index) => (
                            <span
                              className={`text-black-600 rounded border-2 px-2 py-1`}
                              key={`${meta.field}-${index}`}
                            >
                              {meta.keywords}
                            </span>
                          ))}
                    </p>
                    {post.sensitiveMeta && post.sensitiveMeta.length > 4 && (
                      <span
                        className={`text-black-600 rounded px-2 py-1`}
                      >
                        more...
                      </span>
                    )}
                  </>
                ),
              },
              {
                key: "created_at",
                label: "Created Date",
                render: (post) => new Date(post.created_at).toLocaleDateString(),
              },
              {
                key: "isSuspended",
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
            ]}
            totalCount={totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            isFetching={isFetching}
            renderRowActions={(post) => (
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
                      router.push(`/dashboard/post-management/${post.id}`);
                    }}
                  >
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      mutation.mutate(post.id);
                    }}
                  >
                    {post.isSuspended ? "Unblock" : "Block"}
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

export default PostManagement;
