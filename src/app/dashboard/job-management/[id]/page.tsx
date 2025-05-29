'use client';

import { useState } from 'react';

import { Separator } from '@/components/ui/separator';
import PageTitle from '@/components/PageTitle';
import JobDetailView from '@/components/JobDetails';
import JobDetailSkeleton from '@/components/JobDetails/Skeleton';
import {
  useBlockJob,
  useJobById,
  useJobApplications,
} from '@/services/jobs/jobs.hooks';
import { useParams } from 'next/navigation';

export default function JobDetailExample() {
  const { id } = useParams();

  const { data, isFetching, error, refetch } = useJobById(id as string);
  const {
    data: applications,
    isFetching: isFetchingApplications,
  } = useJobApplications(id as string);

  const { toggleBlockMutation } = useBlockJob();

  const handleToggleBlock = (jobId: string) => {
    toggleBlockMutation.mutate(jobId);
  };

  console.log(applications);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <PageTitle route="Jobs" subRoute="Job Management" />
      </div>
      <Separator className="h-[2px] w-full" />
      {data && !isFetching && !isFetchingApplications ? (
        <JobDetailView
          job={data as any}
          toggleBlock={handleToggleBlock}
          applications={applications as any}
        />
      ) : (
        <JobDetailSkeleton />
      )}
    </div>
  );
}
