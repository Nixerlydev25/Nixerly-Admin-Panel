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
import { useRestrictionMutations } from '@/services/restrictions';
import Image from 'next/image';
import {
  usePaginatedBusiness,
  useBlockBusiness,
} from '@/services/business/business.hooks';
import { TBusinessProfileResponse } from '@/types/business';
import { useRouter } from 'next/navigation';

const BusinessManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const { data, isFetching, error, refetch } = usePaginatedBusiness({
    page: currentPage,
    search: searchQuery,
    status: status,
    country: country,
    limit: itemsPerPage,
  });
  const { toggleBlockMutation } = useBlockBusiness();

  const totalCount = data?.pagination?.totalCount || 0;

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

  console.log(data?.businesses, 'data');

  return (
    <div className="flex flex-col">
      {/* Page Title */}
      <div className="p-6">
        <PageTitle route="Businesses" subRoute="Business Management" />
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
        {data?.businesses?.length === 0 ? (
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
            data={data?.businesses || []}
            columns={[
              {
                key: 'user',
                label: 'Name',
                render: (business: TBusinessProfileResponse) =>
                  `${business.user.firstName} ${business.user.lastName}`,
                onClick: (business) => {
                  router.push(`/dashboard/business-management/${business.id}`);
                },
              },
              {
                key: 'user',
                label: 'Email',
                render: (business: TBusinessProfileResponse) =>
                  business.user.email,
              },
              {
                key: 'city',
                label: 'City',
                render: (business: TBusinessProfileResponse) =>
                  business.city || '-',
              },
              {
                key: 'state',
                label: 'State',
                render: (business: TBusinessProfileResponse) =>
                  business.state || '-',
              },
              {
                key: 'country',
                label: 'Country',
                render: (business: TBusinessProfileResponse) =>
                  business.country || '-',
              },
              {
                key: 'companyName',
                label: 'Company Name',
                render: (business: TBusinessProfileResponse) =>
                  business.companyName || '-',
              },
              {
                key: 'industry',
                label: 'Industry',
                render: (business: TBusinessProfileResponse) =>
                  business.industry || '-',
              },
              {
                key: 'totalJobs',
                label: 'Total Jobs',
                render: (business: TBusinessProfileResponse) =>
                  business.totalJobs || 0,
              },
              {
                key: 'user',
                label: 'Status',
                render: (business: TBusinessProfileResponse) => (
                  <span
                    className={`rounded px-2 py-1 ${
                      business.isBlocked
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {business.isBlocked ? 'Suspended' : 'Active'}
                  </span>
                ),
              },
            ]}
            totalCount={totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            isFetching={isFetching}
            renderRowActions={(business: TBusinessProfileResponse) => (
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
                      toggleBlockMutation.mutate(business.id);
                    }}
                  >
                    {business.isBlocked ? 'Unblock' : 'Block'}
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => console.log("Delete", business)}
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

export default BusinessManagement;
