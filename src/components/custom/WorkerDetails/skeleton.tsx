"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const AdminWorkerDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header Skeleton */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Skeleton */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Professional Information Skeleton */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-40" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics Skeleton */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-36" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-md space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job History Skeleton */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                ))}
                <Skeleton className="h-8 w-full mt-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Admin Actions & Status */}
        <div className="space-y-6">
          {/* Admin Actions Skeleton */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-36" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>

          {/* Account Information Skeleton */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    {i < 2 && <div className="border-t border-gray-200 my-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminWorkerDetailSkeleton
