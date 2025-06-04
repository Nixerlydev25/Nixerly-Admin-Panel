'use client';

import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  CalendarIcon,
  UserIcon,
  BriefcaseIcon,
  AlertTriangleIcon,
  DollarSignIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PageTitle from '@/components/PageTitle';
import {
  useGetJobReportById,
  useToggleBlockJob,
} from '@/services/job-report/job-report.hook';
import { TJobReport } from '@/types/job-report.types';
import { WorkerProfile } from '@/types/worker';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface ExtendedWorkerProfile extends WorkerProfile {
  phoneNumber?: string;
  isBlocked?: boolean;
}

interface ExtendedJobReport extends Omit<TJobReport, 'reporterWorker'> {
  reporterWorker: ExtendedWorkerProfile;
}

enum ReportStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

const JobReportDetails: React.FC = () => {
  const { id } = useParams();
  const [currentStatus, setCurrentStatus] = useState('PENDING');
  const router = useRouter();

  const {
    data: reportData,
    isLoading,
    isError,
  } = useGetJobReportById(id as string);

  const { mutate: toggleBlockJob } = useToggleBlockJob();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!reportData?.data) {
    return <div>No data found</div>;
  }

  const data: ExtendedJobReport = reportData.data;

  if (data.status && currentStatus !== data.status) {
    setCurrentStatus(data.status);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ILLEGAL':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'SPAM':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'INAPPROPRIATE':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus);
    // Here you would typically make an API call to update the status
    console.log('Updating status to:', newStatus);
  };

  return (
    <div>
      <div className="p-6">
        <PageTitle route="Job" subRoute="Job Report Management" />
      </div>

      <Separator className="h-[2px] w-full" />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Job Report Details
            </h1>
            <p className="text-gray-600 mt-1">Report ID: {data.id}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={`${getStatusColor(currentStatus)} border`}>
              {currentStatus}
            </Badge>
            <Badge className={`${getCategoryColor(data.category)} border`}>
              {data.category}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangleIcon className="h-5 w-5" />
                  Report Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Report ID
                    </label>
                    <p className="text-sm text-gray-900 font-mono">{data.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Target Job ID
                    </label>
                    <p className="text-sm text-gray-900 font-mono">
                      {data.targetJobId}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Created At
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {formatDate(data.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Last Updated
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {formatDate(data.updatedAt)}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Reason for Report
                  </label>
                  <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">
                    {data.reason}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Reporter Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Reporter Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data.reporterWorker && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Name
                        </label>
                        <p className="text-sm text-gray-900">
                          {data.reporterWorker.user.firstName}{' '}
                          {data.reporterWorker.user.lastName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Email
                        </label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <MailIcon className="h-4 w-4" />
                          {data.reporterWorker.user.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Phone
                        </label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <PhoneIcon className="h-4 w-4" />
                          {data.reporterWorker.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Location
                        </label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          {data.reporterWorker.city},{' '}
                          {data.reporterWorker.state},{' '}
                          {data.reporterWorker.country}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Hourly Rate
                        </label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <DollarSignIcon className="h-4 w-4" />$
                          {data.reporterWorker.hourlyRate}/hour
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Completed Jobs
                        </label>
                        <p className="text-sm text-gray-900">
                          {data.reporterWorker.completedJobs}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Professional Title
                      </label>
                      <p className="text-sm text-gray-900 mt-1">
                        {data.reporterWorker.title}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Description
                      </label>
                      <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">
                        {data.reporterWorker.description}
                      </p>
                    </div>
                  </div>
                )}
                {data.reporterBusiness && (
                  <div>
                    <p className="text-sm text-gray-900">
                      Business Reporter: {data.reporterBusiness.companyName}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reported Job Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BriefcaseIcon className="h-5 w-5" />
                  Reported Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Job Title
                    </label>
                    <p className="text-sm text-gray-900 font-semibold">
                      {data.job.title}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Job Type
                    </label>
                    <p className="text-sm text-gray-900">{data.job.jobType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Employment Type
                    </label>
                    <p className="text-sm text-gray-900">
                      {data.job.employmentType}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Budget
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <DollarSignIcon className="h-4 w-4" />${data.job.budget}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Positions Available
                    </label>
                    <p className="text-sm text-gray-900">
                      {data.job.numberOfPositions}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Workers Required
                    </label>
                    <p className="text-sm text-gray-900">
                      {data.job.numberOfWorkersRequired}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Start Date
                    </label>
                    <p className="text-sm text-gray-900">
                      {formatDate(data.job.startDate)}
                    </p>
                  </div>
                  <div className="flex items-start gap-1 flex-col">
                    <label className="text-sm font-medium text-gray-500">
                      Job Status
                    </label>
                    <Badge
                      variant={
                        data.job.isBlocked
                          ? 'destructive'
                          : data.job.status === 'OPEN'
                            ? 'default'
                            : 'secondary'
                      }
                    >
                      {data.job.isBlocked ? 'Blocked' : data.job.status}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Job Description
                  </label>
                  <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-line">
                    {data.job.description}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Requirements
                  </label>
                  <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-line">
                    {data.job.requirements}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            {/* Status Management */}
            <Card>
              <CardHeader>
                <CardTitle>Status Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Update Report Status
                  </label>
                  <Select
                    value={currentStatus}
                    onValueChange={handleStatusUpdate}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                      <SelectItem value="RESOLVED">Resolved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <Button className="w-full" variant="outline">
                  Add Internal Note
                </Button> */}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    router.push(`/dashboard/job-management/${data.job.id}`);
                  }}
                >
                  View Job Details
                </Button>
                {/* <Button className="w-full" variant="outline">
                  Contact Reporter
                </Button> */}
                {/* <Button className="w-full" variant="outline">
                  View Reporter Profile
                </Button> */}
                <Separator />
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={() => {
                    toggleBlockJob(data.id);
                  }}
                >
                  {data.job?.isBlocked ? 'Unblock Job' : 'Block Job'}
                </Button>
                {/* <Button className="w-full" variant="destructive">
                  Suspend Reporter
                </Button> */}
              </CardContent>
            </Card>

            {/* Report Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Report Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Reports</span>
                  <span className="text-sm font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Hourly Rate Range
                  </span>
                  <span className="text-sm font-medium">
                    {data.job.hourlyRateMax && data.job.hourlyRateMin
                      ? `$${data.job.hourlyRateMin} - $${data.job.hourlyRateMax}`
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <Badge
                    variant={data.job?.isBlocked ? 'destructive' : 'default'}
                  >
                    {data.job?.isBlocked ? 'Blocked' : 'Active'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobReportDetails;
