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
import { Checkbox } from '@/components/ui/checkbox';
import { useBlockUser } from '@/services/user/user.hooks';
import { useRestrictionMutations } from '@/services/restrictions';
import { Restrictions } from '@/types/types';
import Image from 'next/image';
import {
  useBlockWorker,
  usePaginatedWorker,
} from '@/services/worker/worker.hook';
import { useRouter } from 'next/navigation';

const WorkerReportManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const itemsPerPage = 10;

  const params: any = {
    page: currentPage,
    limit: itemsPerPage,
  };

  if (searchQuery !== '') params.search = searchQuery;
  if (status !== '') params.status = status;
  if (country !== '') params.country = country;

  const { data, isFetching, error, refetch } = usePaginatedWorker(params);
  const { toggleBlockMutation } = useBlockWorker();

  const totalCount = data?.totalCount || 0;

  const resetFilters = () => {
    setSearchQuery('');
    setStatus('');
    setCountry('');
    setCurrentPage(1);
    refetch();
  };

  const { addRestriction, removeRestriction } = useRestrictionMutations();

  const toggleRestriction = (
    userId: string,
    restrictionType: string,
    isRestricted: boolean
  ) => {
    if (isRestricted) {
      removeRestriction.mutate({ userId, restrictionType });
    } else {
      addRestriction.mutate({ userId, restrictionType });
    }
  };

  console.log(data?.data, 'data');

  return (
    <div className="flex flex-col">
      {/* Page Title */}
      <div className="p-6">
        <PageTitle route="Workers" subRoute="Worker Management" />
      </div>

      {/* Separator */}
      <Separator className="h-[2px] w-full" />

      {/* Filters Section */}
      <Filters
        searchPlaceHolder="Search by username or email"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        status={status}
        onStatusChange={setStatus}
        country={country}
        onCountryChange={setCountry}
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
                key: 'user',
                label: 'Name',
                render: (worker) =>
                  `${worker.user.firstName} ${worker.user.lastName}`,
                onClick: (worker) => {
                  router.push(`/dashboard/worker-management/${worker.id}`);
                },
              },
              {
                key: 'user',
                label: 'Email',
                render: (worker) => worker.user.email,
              },
              {
                key: 'city',
                label: 'City',
                render: (worker) => worker.city,
              },
              {
                key: 'state',
                label: 'State',
                render: (worker) => worker.state,
              },
              {
                key: 'country',
                label: 'Country',
                render: (worker) => worker.country,
              },
              {
                key: 'hourlyRate',
                label: 'Hourly Rate',
                render: (worker) => `$${worker.hourlyRate}`,
              },
              {
                key: 'totalEarnings',
                label: 'Total Earnings',
                render: (worker) => `$${worker.totalEarnings}`,
              },
              {
                key: 'completedJobs',
                label: 'Completed Jobs',
                render: (worker) => worker.completedJobs,
              },
              {
                key: 'user',
                label: 'Status',
                render: (worker) => (
                  <span
                    className={`rounded px-2 py-1 ${
                      worker.isBlocked
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {worker.isBlocked ? 'Suspended' : 'Active'}
                  </span>
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
                      toggleBlockMutation.mutate(user.id);
                    }}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
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

export default WorkerReportManagement;
