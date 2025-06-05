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
  BuildingIcon,
  AlertTriangleIcon,
  DollarSignIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  BriefcaseIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PageTitle from '@/components/PageTitle';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetWorkerReportById,
  useToggleBlockWorker,
} from '@/services/workerReport/worker-report.hook';
import { WorkerReportDetails } from '@/types/worker-report-details.types';
import WorkerDetailsSkeleton from '@/components/custom/Reports/worker-report-skeleton';

type ReportStatus = 'PENDING' | 'RESOLVED' | 'REJECTED' | 'UNDER_REVIEW';

const WorkerDetails: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: workerReportData, isLoading } = useGetWorkerReportById({
    workerId: id as string,
  });
  const { mutate: toggleBlockMutation } = useToggleBlockWorker();

  const [currentStatus, setCurrentStatus] = useState<ReportStatus>('PENDING');

  if (isLoading) {
    return <WorkerDetailsSkeleton />;
  }

  if (!workerReportData?.data) {
    return <div>No data found</div>;
  }

  const data: WorkerReportDetails = workerReportData.data;

  const getStatusColor = (status: WorkerReportDetails['status']) => {
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

  const getAvailabilityColor = (isAvailable: boolean) => {
    return isAvailable
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-gray-100 text-gray-800 border-gray-200';
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

  const handleStatusUpdate = (newStatus: WorkerReportDetails['status']) => {
    setCurrentStatus(newStatus);
    // Here you would typically make an API call to update the status
    console.log('Updating status to:', newStatus);
  };

  return (
    <div>
      <div className="p-6">
        <PageTitle route="Worker" subRoute="Worker Report Management" />
      </div>

      {/* Separator */}
      <Separator className="h-[2px] w-full" />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Worker Details</h1>
            <p className="text-gray-600 mt-1">Worker ID: {data.id}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={`${getStatusColor(currentStatus)} border`}>
              {currentStatus}
            </Badge>
            <Badge
              className={`${getAvailabilityColor(data.reportedWorker.availability)} border`}
            >
              {data.reportedWorker.availability ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Worker Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Worker Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Worker Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Worker ID
                    </label>
                    <p className="text-sm text-gray-900 font-mono">{data.reportedWorker.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      User ID
                    </label>
                    <p className="text-sm text-gray-900 font-mono">
                      {data.reportedWorker.userId}
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
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Last Active
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {formatDate(data.reportedWorker.lastActive)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Onboarding Status
                    </label>
                    <Badge variant="outline">
                      {data.reportedWorker.onboardingStep}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Professional Title
                  </label>
                  <p className="text-sm text-gray-900 mt-1 font-semibold">
                    {data.reportedWorker.title}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Professional Description
                  </label>
                  <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">
                    {data.reportedWorker.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Name
                      </label>
                      <p className="text-sm text-gray-900">
                        {data.reportedWorker.user.firstName}{' '}
                        {data.reportedWorker.user.lastName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Email
                      </label>
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <MailIcon className="h-4 w-4" />
                        {data.reportedWorker.user.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Phone
                      </label>
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <PhoneIcon className="h-4 w-4" />
                        {data.reportedWorker.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Location
                      </label>
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        {data.reportedWorker.city}, {data.reportedWorker.state},{' '}
                        {data.reportedWorker.country}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Email Verified
                      </label>
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        {data.reportedWorker.user.isVerified ? (
                          <>
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                            Verified
                          </>
                        ) : (
                          <>
                            <XCircleIcon className="h-4 w-4 text-red-500" />
                            Not Verified
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BriefcaseIcon className="h-5 w-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Hourly Rate
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <DollarSignIcon className="h-4 w-4" />$
                      {data.reportedWorker.hourlyRate}
                      /hour
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Total Earnings
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <DollarSignIcon className="h-4 w-4" />$
                      {data.reportedWorker.totalEarnings}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Completed Jobs
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <BriefcaseIcon className="h-4 w-4" />
                      {data.reportedWorker.completedJobs}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Average Rating
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      {data.reportedWorker.avgRating || 'No ratings yet'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Availability
                    </label>
                    <Badge
                      className={`${getAvailabilityColor(data.reportedWorker.availability)} border`}
                    >
                      {data.reportedWorker.availability
                        ? 'Available'
                        : 'Unavailable'}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Days Since Registration
                    </label>
                    <p className="text-sm text-gray-900">
                      {Math.floor(
                        (new Date().getTime() -
                          new Date(data.createdAt).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reports Against Worker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangleIcon className="h-5 w-5" />
                  Reports Against Worker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Report ID
                      </label>
                      <p className="text-sm text-gray-900 font-mono">
                        {data.id}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Status
                      </label>
                      <Badge className={`${getStatusColor(data.status)} border`}>
                        {data.status}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Category
                      </label>
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                        {data.reason}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Date Reported
                      </label>
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {formatDate(data.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Reported By
                      </label>
                      <div className="flex items-center gap-1">
                        <BuildingIcon className="h-4 w-4" />
                        <p className="text-sm text-gray-900">
                          {data.reporterBusiness.companyName ||
                            'Unknown Business'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Reporter Industry
                      </label>
                      <p className="text-sm text-gray-900 capitalize">
                        {data.reporterBusiness.industry || 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Reason for Report
                    </label>
                    <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">
                      {data.description}
                    </p>
                  </div>
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
                    Update Worker Status
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
                  onClick={() =>
                    router.push(
                      `/dashboard/worker-management/${data.reportedWorker.id}`
                    )
                  }
                >
                  View Worker Profile
                </Button>
                <Separator />
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={() => {
                    toggleBlockMutation({
                      workerId: data.reportedWorker.id,
                    });
                  }}
                >
                  {data.reportedWorker.isBlocked ? 'Unblock Worker' : 'Block Worker'}
                </Button>
              </CardContent>
            </Card>

            {/* Worker Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Worker Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completed Jobs</span>
                  <span className="text-sm font-medium">
                    {data.reportedWorker.completedJobs}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Earnings</span>
                  <span className="text-sm font-medium">
                    ${data.reportedWorker.totalEarnings}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {data.reportedWorker.avgRating || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <Badge
                    variant={
                      data.reportedWorker.isBlocked ? 'destructive' : 'default'
                    }
                  >
                    {data.reportedWorker.isBlocked ? 'Blocked' : 'Active'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Account Verification */}
            <Card>
              <CardHeader>
                <CardTitle>Account Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Email Verified</span>
                  <Badge
                    variant={
                      data.reportedWorker.user.isVerified
                        ? 'outline'
                        : 'secondary'
                    }
                  >
                    {data.reportedWorker.user.isVerified
                      ? 'Verified'
                      : 'Unverified'}
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

export default WorkerDetails;
