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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  useGetJobReports,
  useToggleBlockJob,
} from '@/services/job-report/job-report.hook';
import { DateRange } from 'react-day-picker';

const JobReportManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const itemsPerPage = 10;

  const params: any = {
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery || undefined,
    startDate: dateRange?.from?.toISOString(),
    endDate: dateRange?.to?.toISOString(),
  };

  const { data, isFetching, refetch } = useGetJobReports(params);
  const { mutate: toggleBlockMutation } = useToggleBlockJob();

  const resetFilters = () => {
    setSearchQuery('');
    setDateRange(undefined);
    setCurrentPage(1);
    refetch();
  };

  return (
    <div className="flex flex-col">
      <div className="p-6">
        <PageTitle route="Job Reports" subRoute="Job Report Management" />
      </div>

      <Separator className="h-[2px] w-full" />

      <Filters
        searchPlaceHolder="Search by username or email"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        // status={status}
        // onStatusChange={setStatus}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onResetFilters={resetFilters}
      />

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
                key: 'reportedJob',
                label: 'Job Title',
                render: (report) => report.reportedJob.title,
                onClick: (report) => {
                  router.push(`/dashboard/job-report-management/${report.id}`);
                },
              },
              {
                key: 'reportedJob',
                label: 'Business',
                render: (report) => report.reportedJob.businessProfile.companyName,
              },
              {
                key: 'reporterWorker',
                label: 'Reporter',
                render: (report) =>
                  `${report.reporterWorker.user.firstName} ${report.reporterWorker.user.lastName}`,
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
            ]}
            totalCount={data?.pagination?.totalCount || 0}
            itemsPerPage={itemsPerPage}
            currentPage={data?.pagination?.currentPage || 1}
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
                      toggleBlockMutation(report.reportedJobId);
                    }}
                  >
                    Block Job
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

export default JobReportManagement;
