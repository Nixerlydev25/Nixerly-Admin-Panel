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
  Building,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Mail,
  Shield,
  ShieldOff,
  AlertTriangle,
  Clock,
  FileText,
} from 'lucide-react';

interface BusinessProfileProps {
  business: {
    id: string;
    companyName: string;
    description: string;
    industry: string;
    city: string;
    state: string;
    country: string;
    website: string | null;
    employeeCount: number;
    yearFounded: number;
    phoneNumber: string | null;
    createdAt: string;
    updatedAt: string;
    isBlocked: boolean;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      defaultProfile: string;
    };
    _count: {
      jobs: number;
    };
    totalJobs: number;
  };
  toggleBlock?: (businessId: string) => void;
}

const BusinessProfileView: React.FC<BusinessProfileProps> = ({
  business,
  toggleBlock,
}) => {
  const handleBlockToggle = () => {
    toggleBlock?.(business.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Convert industry string to title case
  const formatIndustry = (industry: string) => {
    return industry.charAt(0).toUpperCase() + industry.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header with admin controls */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center text-white text-xl font-semibold">
            {business.companyName.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Business ID: {business.id.substring(0, 8)}...
            </h2>
            <p className="text-sm text-gray-500">{business.companyName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={business.isBlocked ? 'destructive' : 'default'}
            className={
              business.isBlocked
                ? ''
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }
          >
            {business.isBlocked ? 'Suspended' : 'Active'}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Building className="w-4 h-4 mr-2 text-blue-600" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Company Name
                  </p>
                  <p className="text-sm text-gray-900">
                    {business.companyName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Industry</p>
                  <Badge
                    variant="outline"
                    className="mt-1 bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {formatIndustry(business.industry)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      {business.city}, {business.state}, {business.country}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Year Founded
                  </p>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      {business.yearFounded}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Employee Count
                  </p>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      {business.employeeCount} employees
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Jobs
                  </p>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-3 h-3 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      {business.totalJobs} jobs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Business Owner
                  </p>
                  <p className="text-sm text-gray-900">
                    {business.user.firstName} {business.user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{business.user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Phone Number
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    {business.phoneNumber
                      ? business.phoneNumber
                      : 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Website</p>
                  <p className="text-sm text-gray-500 italic">
                    {business.website ? (
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {business.website}
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Description */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                Business Description
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700 leading-relaxed">
                {business.description}
              </p>
            </CardContent>
          </Card>

          {/* Recent Jobs */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                Recent Jobs
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {business.totalJobs > 0 ? (
                <div className="space-y-3">
                  {/* Example job entries - replace with actual job data */}
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Office Plumbing Renovation
                        </p>
                        <p className="text-xs text-gray-500">
                          Posted on May 25, 2025
                        </p>
                      </div>
                      <Badge
                        variant="default"
                        className="bg-blue-100 text-blue-700"
                      >
                        Active
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Budget: $2,500</span>
                      <span>2 applicants</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Emergency Pipe Repair
                        </p>
                        <p className="text-xs text-gray-500">
                          Posted on May 20, 2025
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
                      <span>Budget: $800</span>
                      <span>5 applicants</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Bathroom Installation
                        </p>
                        <p className="text-xs text-gray-500">
                          Posted on May 15, 2025
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
                      <span>Budget: $1,200</span>
                      <span>3 applicants</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Jobs ({business.totalJobs})
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500">No jobs posted yet</p>
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
                      variant={business.isBlocked ? 'default' : 'destructive'}
                      className={
                        business.isBlocked
                          ? 'bg-blue-600 hover:bg-blue-700 w-full'
                          : 'w-full'
                      }
                      size="sm"
                    >
                      {business.isBlocked ? (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Unblock Business
                        </>
                      ) : (
                        <>
                          <ShieldOff className="w-4 h-4 mr-2" />
                          Block Business
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {business.isBlocked
                          ? 'Unblock Business'
                          : 'Block Business'}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {business.isBlocked
                          ? 'This will allow the business to access the platform and post jobs again. Are you sure you want to unblock this business?'
                          : 'This will prevent the business from accessing the platform and posting new jobs. Are you sure you want to block this business?'}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleBlockToggle}
                        className={
                          business.isBlocked
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-red-600 hover:bg-red-700'
                        }
                      >
                        {business.isBlocked ? 'Yes, Unblock' : 'Yes, Block'}
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
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
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
                    {formatDate(business.createdAt)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Updated:</span>
                  <span className="text-sm text-gray-900">
                    {formatDate(business.updatedAt)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Account Type:</span>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200"
                  >
                    {business.user.defaultProfile}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Shield className="w-4 h-4 mr-2 text-blue-600" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Email Verification:
                  </span>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-700"
                  >
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Business Verification:
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    Pending
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Payment Verification:
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-gray-100 text-gray-500 border-gray-200"
                  >
                    Not Started
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileView;
