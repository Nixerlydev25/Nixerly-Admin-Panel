'use client';

import { useState } from 'react';
import AdminWorkerDetailView from '@/components/custom/WorkerDetails';
import { Separator } from '@/components/ui/separator';
import PageTitle from '@/components/PageTitle';
import { useBlockWorker, useWorkerById } from '@/services/worker/worker.hook';
import { useParams } from 'next/navigation';
import AdminWorkerDetailSkeleton from '@/components/custom/WorkerDetails/skeleton';

export default function WorkerDetailExample() {
  const { id } = useParams();
  const { data, isFetching, error, refetch } = useWorkerById(id as string);
  const { toggleBlockMutation } = useBlockWorker();

  const handleToggleBlock = (workerId: string) => {
    toggleBlockMutation.mutate(workerId);
  };

  console.log(data);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <PageTitle route="Workers" subRoute="Worker Management" />
      </div>
      <Separator className="h-[2px] w-full" />
      {data && !isFetching ? (
        <>
          <AdminWorkerDetailView
            worker={data as any}
            toggleBlock={handleToggleBlock}
          />
        </>
      ) : (
        <div>
          <AdminWorkerDetailSkeleton />
        </div>
      )}
    </div>
  );
}
