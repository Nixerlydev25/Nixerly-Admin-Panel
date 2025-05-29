'use client';

import { useState } from 'react';
import BusinessProfileView from '@/components/custom/BusinessDetails';
import { Separator } from '@/components/ui/separator';
import PageTitle from '@/components/PageTitle';
import {
  useBlockBusiness,
  useBusinessById,
} from '@/services/business/business.hooks';
import { useParams } from 'next/navigation';
import BusinessProfileSkeleton from '@/components/custom/BusinessDetails/Skeleton';

export default function BusinessProfileExample() {
  const { id } = useParams();
  const { data, isFetching, error, refetch } = useBusinessById(id as string);
  const { toggleBlockMutation } = useBlockBusiness();

  const handleToggleBlock = (businessId: string) => {
    toggleBlockMutation.mutate(businessId);
  };

  console.log(data);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="p-6">
        <PageTitle route="Businesses" subRoute="Business Management" />
      </div>
      <Separator className="h-[2px] w-full" />
      {data && !isFetching ? (
        <BusinessProfileView
          business={data as any}
          toggleBlock={handleToggleBlock}
        />
      ) : (
        <div>
          <BusinessProfileSkeleton />
        </div>
      )}
    </div>
  );
}
