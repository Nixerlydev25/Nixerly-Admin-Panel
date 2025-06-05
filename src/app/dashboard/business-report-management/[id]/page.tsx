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
  GlobeIcon,
  UsersIcon,
  BriefcaseIcon,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useGetBusinessReportById,
  useToggleBlockBusiness,
} from '@/services/businessReport/business-report.hook';
import { useParams, useRouter } from 'next/navigation';
import BusinessReportSkeleton from '@/components/custom/Reports/business-report-skeleton';
import type { BusinessReport as IBusinessReport } from '@/types/business-report.type';
import { BusinessReportResponse } from '@/types/business-report.type';
import PageTitle from '@/components/PageTitle';

enum ReportStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

const BusinessReportDetails: React.FC = () => {
  const { id } = useParams();
  const [currentStatus, setCurrentStatus] = useState<string>('PENDING');
  const router = useRouter();

  const {
    data: reportData,
    isLoading,
    isError,
  } = useGetBusinessReportById({
    businessId: id as string,
  });
  console.log(reportData)

  const { mutate: toggleBlockBusiness } = useToggleBlockBusiness();

  if (isLoading) {
    return <BusinessReportSkeleton />;
  }

  if (isError) {
    return <div>Error loading report</div>;
  }

  if (!reportData?.data) {
    return <div>No data found</div>;
  }

  const data: IBusinessReport = reportData.data;
  console.log(reportData);

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
      case 'OTHER':
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
        <PageTitle route="Business" subRoute="Business Report Management" />
      </div>

      {/* Separator */}
      <Separator className="h-[2px] w-full" />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Business Report Details
            </h1>
            <p className="text-gray-600 mt-1">Report ID: {data.id}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={`${getStatusColor(currentStatus)} border`}>
              {currentStatus}
            </Badge>
            <Badge className={`${getCategoryColor(data.reason)} border`}>
              {data.reason}
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
                      Target Business ID
                    </label>
                    <p className="text-sm text-gray-900 font-mono">
                      {data.reportedBusinessId}
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
              </CardContent>
            </Card>

            {/* Reported Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BuildingIcon className="h-5 w-5" />
                  Reported Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Company Name
                    </label>
                    <p className="text-sm text-gray-900 font-semibold">
                      {data.reportedBusiness.companyName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Industry
                    </label>
                    <p className="text-sm text-gray-900 capitalize">
                      {data.reportedBusiness.industry}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Owner Name
                    </label>
                    <p className="text-sm text-gray-900">
                      {data.reportedBusiness.user.firstName}{' '}
                      {data.reportedBusiness.user.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Owner Email
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <MailIcon className="h-4 w-4" />
                      {data.reportedBusiness.user.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone Number
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <PhoneIcon className="h-4 w-4" />
                      {data.reportedBusiness.phoneNumber || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Location
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" />
                      {data.reportedBusiness.city}, {data.reportedBusiness.state},{' '}
                      {data.reportedBusiness.country}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Website
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <GlobeIcon className="h-4 w-4" />
                      {data.reportedBusiness.website || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Employee Count
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <UsersIcon className="h-4 w-4" />
                      {data.reportedBusiness.employeeCount} employees
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Year Founded
                    </label>
                    <p className="text-sm text-gray-900">
                      {data.reportedBusiness.yearFounded}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Total Spent
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <DollarSignIcon className="h-4 w-4" />$
                      {data.reportedBusiness.totalSpent}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Posted Jobs
                    </label>
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <BriefcaseIcon className="h-4 w-4" />
                      {data.reportedBusiness.postedJobs} jobs
                    </p>
                  </div>
                  <div className="flex items-start gap-1 flex-col">
                    <label className="text-sm font-medium text-gray-500">
                      Account Status
                    </label>
                    <Badge
                      variant={
                        data.reportedBusiness.isBlocked
                          ? 'destructive'
                          : 'default'
                      }
                    >
                      {data.reportedBusiness.isBlocked ? 'Blocked' : 'Active'}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-1 flex-col">
                    <label className="text-sm font-medium text-gray-500">
                      Onboarding Status
                    </label>
                    <Badge variant="outline">
                      {data.reportedBusiness.onboardingStep}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Last Active
                    </label>
                    <p className="text-sm text-gray-900">
                      {formatDate(data.reportedBusiness.lastActive)}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Business Description
                  </label>
                  <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">
                    {data.reportedBusiness.description}
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
                  onClick={() =>
                    router.push(
                      `/dashboard/business-management/${data.reportedBusiness.id}`
                    )
                  }
                >
                  View Business Profile
                </Button>
                {/* <Button className="w-full" variant="outline">
                Contact Business Owner
              </Button>
              <Button className="w-full" variant="outline">
                Contact Reporter
              </Button> */}
                <Separator />
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={() => {
                    toggleBlockBusiness({
                      businessId: data.reportedBusiness.id,
                    });
                  }}
                >
                  {data.reportedBusiness.isBlocked ? 'Unblock Business' : 'Block Business'}
                </Button>
                {/* <Button className="w-full" variant="destructive">
                Suspend Business Account
              </Button> */}
              </CardContent>
            </Card>

            {/* Business Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Business Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Posted Jobs</span>
                  <span className="text-sm font-medium">
                    {data.reportedBusiness.postedJobs}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Spent</span>
                  <span className="text-sm font-medium">
                    ${data.reportedBusiness.totalSpent}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Employee Count</span>
                  <span className="text-sm font-medium">
                    {data.reportedBusiness.employeeCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <Badge
                    variant={
                      data.reportedBusiness.isBlocked ? 'destructive' : 'default'
                    }
                  >
                    {data.reportedBusiness.isBlocked ? 'Blocked' : 'Active'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Reporter Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Reporter Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reporter Rating</span>
                  <span className="text-sm font-medium">
                    {data.reporterWorker?.avgRating || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completed Jobs</span>
                  <span className="text-sm font-medium">
                    {data.reporterWorker?.completedJobs || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reporter Status</span>
                  <Badge
                    variant={
                      data.reporterWorker?.isBlocked ? 'destructive' : 'default'
                    }
                  >
                    {data.reporterWorker?.isBlocked ? 'Blocked' : 'Active'}
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

export default BusinessReportDetails;
