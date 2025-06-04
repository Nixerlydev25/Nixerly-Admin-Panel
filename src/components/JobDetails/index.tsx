'use client';

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Briefcase,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Shield,
  ShieldOff,
  AlertTriangle,
  FileText,
  Building,
} from 'lucide-react';

interface JobDetailProps {
  applications: any[];
  job: {
    id: string;
    title: string;
    description: string;
    requirements: string;
    employmentType: string;
    numberOfPositions: number;
    budget: number;
    hourlyRateMin: number | null;
    hourlyRateMax: number | null;
    salary: number | null;
    businessProfileId: string;
    status: string;
    jobType: string;
    startDate: string;
    numberOfWorkersRequired: number;
    createdAt: string;
    updatedAt: string;
    expiresAt: string | null;
    isBlocked: boolean;
    hasWorkerApplied: boolean;
    businessProfile: {
      id: string;
      userId: string;
      companyName: string;
      description: string;
      industry: string;
      phoneNumber: string | null;
      city: string;
      state: string;
      country: string;
      website: string | null;
      employeeCount: number;
      yearFounded: number;
      totalSpent: number;
      postedJobs: number;
      onboardingStep: string;
      createdAt: string;
      updatedAt: string;
      isBlocked: boolean;
      lastActive: string;
    };
    skills: string[];
    workAreaImages: string[];
  };
  toggleBlock?: (jobId: string) => void;
}

const JobDetailView: React.FC<JobDetailProps> = ({
  job,
  toggleBlock,
  applications,
}) => {
  const handleBlockToggle = () => {
    toggleBlock?.(job.id);
  };


  console.log(job)

  const formatDate = (dateString: string) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format employment type and job type
  const formatType = (type: string) => {
    return type?.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-red-100 text-red-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header with admin controls */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center text-white text-sm font-semibold">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Job ID: {job?.id?.substring(0, 8)}...
            </h2>
            <p className="text-sm text-gray-500">{job.title}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={getStatusColor(job.status)}>
            {formatType(job.status)}
          </Badge>
          <Badge
            variant={job.isBlocked ? 'destructive' : 'default'}
            className={
              job.isBlocked
                ? ''
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }
          >
            {job.isBlocked ? 'Blocked' : 'Active'}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                Job Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Job Title</p>
                  <p className="text-sm text-gray-900">{job.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Employment Type
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-1 bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {formatType(job.employmentType)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Job Type</p>
                  <Badge
                    variant="outline"
                    className="mt-1 bg-purple-50 text-purple-700 border-purple-200"
                  >
                    {formatType(job.jobType)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge
                    variant="outline"
                    className={`mt-1 ${getStatusColor(job.status)}`}
                  >
                    {formatType(job.status)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Start Date
                  </p>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      {formatDate(job.startDate)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Expires At
                  </p>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      {job.expiresAt
                        ? formatDate(job.expiresAt)
                        : 'No expiration'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {job.requirements}
              </div>
            </CardContent>
          </Card>

          {/* Budget & Compensation */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                Budget & Compensation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {job.budget && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500">Total Budget</p>
                    <p className="text-lg font-semibold text-blue-600">
                      ${job.budget.toLocaleString()}
                    </p>
                  </div>
                )}
                {job.hourlyRateMax && job.hourlyRateMin && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500">Hourly Rate Range</p>
                    <p className="text-lg font-semibold text-blue-600">
                      ${job.hourlyRateMin.toLocaleString()} - $
                      {job.hourlyRateMax.toLocaleString()}
                    </p>
                  </div>
                )}
                {job.salary && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500">Salary</p>
                    <p className="text-lg font-semibold text-blue-600">
                      ${job.salary.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Job Applications */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Job Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {applications &&
                  applications?.map((application, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-md p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Worker ID:{' '}
                            {application.workerProfile.id.substring(0, 8)}...
                          </p>
                          <p className="text-xs text-gray-500">
                            Applied {formatDateTime(application.createdAt)}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          {formatType(application.status)}
                        </Badge>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>
                            Start Date:{' '}
                            {formatDate(
                              application.workerStartDateAvailability
                            )}
                          </span>
                          <span>
                            Duration: {formatType(application.duration)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                <Button variant="outline" size="sm" className="w-full mt-3">
                  View All Applications ({applications.length})
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Admin Actions & Status */}
        <div className="space-y-6">
          {/* Admin Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-blue-600" />
                Administrative Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={job.isBlocked ? 'default' : 'destructive'}
                      className={
                        job.isBlocked
                          ? 'bg-blue-600 hover:bg-blue-700 w-full'
                          : 'w-full'
                      }
                      size="sm"
                    >
                      {job.isBlocked ? (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Unblock Job
                        </>
                      ) : (
                        <>
                          <ShieldOff className="w-4 h-4 mr-2" />
                          Block Job
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {job.isBlocked ? 'Unblock Job' : 'Block Job'}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {job.isBlocked
                          ? 'This will make the job visible to workers again and allow applications. Are you sure you want to unblock this job?'
                          : 'This will hide the job from workers and prevent new applications. Are you sure you want to block this job?'}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleBlockToggle}
                        className={
                          job.isBlocked
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-red-600 hover:bg-red-700'
                        }
                      >
                        {job.isBlocked ? 'Yes, Unblock' : 'Yes, Block'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          {/* Job Statistics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Job Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Positions Available:
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {job.numberOfPositions}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Workers Required:
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {job.numberOfWorkersRequired}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Total Applications:
                  </span>
                  <span className="text-sm font-medium text-gray-900">1</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Views:</span>
                  <span className="text-sm font-medium text-gray-900">127</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Building className="w-4 h-4 mr-2 text-blue-600" />
                Posted By
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Business ID:</span>
                  <span className="text-sm text-gray-900">
                    {job.businessProfileId?.substring(0, 8)}...
                  </span>
                </div>
                <Separator />
                <Button variant="outline" size="sm" className="w-full">
                  View Business Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Created:</span>
                  <span className="text-sm text-gray-900">
                    {formatDateTime(job.createdAt)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Updated:</span>
                  <span className="text-sm text-gray-900">
                    {formatDateTime(job.updatedAt)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Start Date:</span>
                  <span className="text-sm text-gray-900">
                    {formatDate(job.startDate)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetailView;
