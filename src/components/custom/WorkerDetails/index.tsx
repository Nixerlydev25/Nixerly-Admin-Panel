'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  User,
  Shield,
  ShieldOff,
  AlertTriangle,
  History,
  FileText,
} from 'lucide-react';

interface WorkerDetailProps {
  worker: {
    id: string;
    userId: string;
    title: string;
    phoneNumber: string;
    description: string;
    city: string;
    state: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    hourlyRate: number;
    availability: boolean;
    totalEarnings: number;
    completedJobs: number;
    avgRating: number;
    onboardingStep: string;
    isBlocked: boolean;
    lastActive: string;
    user: {
      firstName: string;
      lastName: string;
      defaultProfile: string;
      email: string;
    };
    skills: string[];
    experience: any[];
    education: any[];
    languages: {
      id: string;
      workerId: string;
      language: string;
      proficiency: string;
    }[];
  };
  toggleBlock?: (workerId: string) => void;
  onClose?: () => void;
}

const AdminWorkerDetailView: React.FC<WorkerDetailProps> = ({
  worker,
  toggleBlock,
}) => {
  const handleBlockToggle = () => {
    toggleBlock?.(worker?.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header with admin controls */}
      <div className="m-6 mb-0 rounded-sm bg-gray-50 p-4 border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {worker?.user?.firstName[0]}
            {worker?.user?.lastName[0]}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Worker ID: {worker?.id?.substring(0, 8)}...
            </h2>
            <p className="text-sm text-gray-500">
              {worker?.user?.firstName} {worker?.user?.lastName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={worker?.isBlocked ? 'destructive' : 'default'}
            className={
              worker?.isBlocked
                ? ''
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }
          >
            {worker?.isBlocked ? 'Suspended' : 'Active'}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Worker Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-sm text-gray-900">
                    {worker?.user?.firstName} {worker?.user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{worker?.user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{worker?.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-sm text-gray-900">
                    {worker?.city}, {worker?.state}, {worker?.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Hourly Rate
                  </p>
                  <p className="text-sm text-gray-900">${worker?.hourlyRate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Onboarding Status
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-1 bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {worker?.onboardingStep}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Title & Description */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Title</p>
                  <p className="text-sm text-gray-900">{worker?.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Description
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {worker?.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <History className="w-4 h-4 mr-2 text-blue-600" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500">Completed Jobs</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {worker?.completedJobs}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500">Total Earnings</p>
                  <p className="text-lg font-semibold text-blue-600">
                    ${worker?.totalEarnings}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500">Average Rating</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {worker?.avgRating > 0
                      ? worker?.avgRating.toFixed(1)
                      : 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500">Availability</p>
                  <Badge
                    variant={worker?.availability ? 'default' : 'secondary'}
                    className="mt-1"
                  >
                    {worker?.availability ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job History */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <History className="w-4 h-4 mr-2 text-blue-600" />
                Recent Job History
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {worker?.completedJobs > 0 ? (
                <div className="space-y-3">
                  {/* Example job entries - replace with actual job data */}
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Kitchen Sink Repair
                        </p>
                        <p className="text-xs text-gray-500">
                          Residential • 2 hours
                        </p>
                      </div>
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-700"
                      >
                        Completed
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Dec 15, 2024</span>
                      <span className="font-medium text-gray-900">$70.00</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Bathroom Renovation
                        </p>
                        <p className="text-xs text-gray-500">
                          Commercial • 8 hours
                        </p>
                      </div>
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-700"
                      >
                        Completed
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Dec 10, 2024</span>
                      <span className="font-medium text-gray-900">$280.00</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Pipe Installation
                        </p>
                        <p className="text-xs text-gray-500">
                          Residential • 4 hours
                        </p>
                      </div>
                      <Badge
                        variant="default"
                        className="bg-blue-100 text-blue-700"
                      >
                        In Progress
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Dec 8, 2024</span>
                      <span className="font-medium text-gray-900">$140.00</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Jobs ({worker?.completedJobs + 5})
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500">
                    No job history available
                  </p>
                </div>
              )}
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
                      variant={worker?.isBlocked ? 'default' : 'destructive'}
                      className={
                        worker?.isBlocked
                          ? 'bg-blue-600 hover:bg-blue-700 w-full'
                          : 'w-full'
                      }
                      size="sm"
                    >
                      {worker?.isBlocked ? (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Unblock Worker
                        </>
                      ) : (
                        <>
                          <ShieldOff className="w-4 h-4 mr-2" />
                          Block Worker
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {worker?.isBlocked ? 'Unblock Worker' : 'Block Worker'}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {worker?.isBlocked
                          ? 'This will allow the worker to access the platform and accept jobs again. Are you sure you want to unblock this worker?'
                          : 'This will prevent the worker from accessing the platform and accepting new jobs. Are you sure you want to block this worker?'}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleBlockToggle}
                        className={
                          worker?.isBlocked
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-red-600 hover:bg-red-700'
                        }
                      >
                        {worker?.isBlocked ? 'Yes, Unblock' : 'Yes, Block'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Account Created:
                  </span>
                  <span className="text-sm text-gray-900">
                    {formatDate(worker?.createdAt)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Active:</span>
                  <span className="text-sm text-gray-900">
                    {formatDate(worker?.lastActive)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Updated:</span>
                  <span className="text-sm text-gray-900">
                    {formatDate(worker?.updatedAt)}
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

export default AdminWorkerDetailView;
