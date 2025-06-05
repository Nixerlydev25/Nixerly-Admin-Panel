'use client';

import React, { useState } from 'react';
import { DataTable } from '@/components/custom/datatable';
import { Filters } from '@/components/custom/filters';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import PageTitle from '@/components/PageTitle';
import { Separator } from '@/components/ui/separator';
import { useToggleBlockWorker } from '@/services/workerReport/worker-report.hook';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGetWorkerReport } from '@/services/workerReport/worker-report.hook';
import { format } from 'date-fns';

const WorkerReportManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});
  const router = useRouter();
  const itemsPerPage = 10;

  const params = {
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery || undefined,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  };

  const { data, isFetching, refetch } = useGetWorkerReport(params);

  const { mutate: toggleBlockMutation } = useToggleBlockWorker();

  const resetFilters = () => {
    setSearchQuery('');
    setDateRange({});
    setCurrentPage(1);
    refetch();
  };

  return (
    <div className="flex flex-col">
      {/* Page Title */}
      <div className="p-6">
        <PageTitle route="Worker" subRoute="Worker Report Management" />
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
        {data?.reports?.length === 0 ? (
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
            data={data?.reports || []}
            columns={[
              {
                key: 'reportedWorker',
                label: 'Worker Name',
                render: (report) =>
                  `${report.reportedWorker.user.firstName} ${report.reportedWorker.user.lastName}`,
                onClick: (report) => {
                  router.push(
                    `/dashboard/worker-report-management/${report.id}`
                  );
                },
              },
              {
                key: 'reporterBusiness',
                label: 'Reporter Business',
                render: (report) => report.reporterBusiness?.companyName || '-',
              },
              {
                key: 'reason',
                label: 'Reason',
                render: (report) => report.reason,
              },
              {
                key: 'description',
                label: 'Description',
                render: (report) => report.description,
              },
              {
                key: 'status',
                label: 'Status',
                render: (report) => (
                  <span
                    className={`rounded px-2 py-1 ${
                      report.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-600'
                        : report.status === 'RESOLVED'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {report.status}
                  </span>
                ),
              },
              {
                key: 'createdAt',
                label: 'Created At',
                render: (report) => format(new Date(report.createdAt), 'PPP'),
              },
            ]}
            totalCount={data?.pagination?.totalCount || 0}
            itemsPerPage={itemsPerPage}
            currentPage={data?.pagination?.currentPage || 0}
            onPageChange={setCurrentPage}
            isFetching={isFetching}
            renderRowActions={(report) => (
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
                      toggleBlockMutation({ workerId: report.reportedWorkerId });
                    }}
                  >
                    Block Worker
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

export default WorkerReportManagement;
