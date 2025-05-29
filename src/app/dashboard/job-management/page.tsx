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
import { usePaginatedJobs, useBlockJob } from '@/services/jobs/jobs.hooks';
import { TJob } from '@/types/jobs';
import { useRouter } from 'next/navigation';

const JobManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [employmentType, setEmploymentType] = useState<string>('');
  const [jobType, setJobType] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const { data, isFetching, error, refetch } = usePaginatedJobs({
    page: currentPage,
    search: searchQuery,
    status: status,
    employmentType: employmentType,
    jobType: jobType,
    limit: itemsPerPage,
  });
  const { toggleBlockMutation } = useBlockJob();

  const totalCount = data?.pagination?.totalCount || 0;

  const resetFilters = () => {
    setSearchQuery('');
    setStatus('');
    setEmploymentType('');
    setJobType('');
    setCurrentPage(1);
    refetch();
  };

  return (
    <div className="flex flex-col">
      {/* Page Title */}
      <div className="p-6">
        <PageTitle route="Jobs" subRoute="Job Management" />
      </div>

      {/* Separator */}
      <Separator className="h-[2px] w-full" />

      {/* Filters Section */}
      <Filters
        searchPlaceHolder="Search by job title"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        status={status}
        onStatusChange={setStatus}
        employmentType={employmentType}
        onEmploymentTypeChange={setEmploymentType}
        jobType={jobType}
        onJobTypeChange={setJobType}
        onResetFilters={resetFilters}
      />

      {/* Data Table Section */}
      <div className="p-6">
        {data?.jobs?.length === 0 ? (
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
            data={data?.jobs || []}
            columns={[
              {
                key: 'title',
                label: 'Title',
                render: (job: TJob) => job.title,
                onClick: (job) => {
                  router.push(`/dashboard/job-management/${job.id}`);
                },
              },
              {
                key: 'employmentType',
                label: 'Employment Type',
                render: (job: TJob) => job.employmentType || '-',
              },
              {
                key: 'numberOfPositions',
                label: 'Positions',
                render: (job: TJob) => job.numberOfPositions || '-',
              },
              {
                key: 'budget',
                label: 'Budget',
                render: (job: TJob) => job.budget || '-',
              },
              {
                key: 'hourlyRateMin',
                label: 'Hourly Rate',
                render: (job: TJob) =>
                  job.hourlyRateMin && job.hourlyRateMax
                    ? `$${job.hourlyRateMin} - $${job.hourlyRateMax}`
                    : '-',
              },
              {
                key: 'salary',
                label: 'Salary',
                render: (job: TJob) => (job.salary ? `$${job.salary}` : '-'),
              },
              {
                key: 'status',
                label: 'Status',
                render: (job: TJob) => (
                  <span
                    className={`rounded px-2 py-1 ${
                      job.isBlocked
                        ? 'bg-red-100 text-red-600'
                        : job.status === 'active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {job.isBlocked
                      ? 'Blocked'
                      : job.status.charAt(0).toUpperCase() +
                        job.status.slice(1)}
                  </span>
                ),
              },
            ]}
            totalCount={totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            isFetching={isFetching}
            renderRowActions={(job: TJob) => (
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
                      toggleBlockMutation.mutate(job.id);
                    }}
                  >
                    {job.isBlocked ? 'Unblock' : 'Block'}
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

export default JobManagement;
