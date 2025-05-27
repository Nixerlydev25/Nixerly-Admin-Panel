"use client";

import type React from "react";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  ThumbsUp,
  MapPin,
  Phone,
  Calendar,
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTitle from "@/components/PageTitle";
import {
  useReportedPost,
  useChangePostReportStatus,
  useBlockPost,
} from "@/services/postReports/postReports.hooks";
import { useState } from "react";
import type {
  OriginalPost,
  ReportDetails as ReportDetailsType,
} from "@/types/postReports";
import { PostReportStatus } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const ReportDetails: React.FC = () => {
  const params = useParams();
  const reportId = params.reportId as string;

  const { data: reportData, isFetching, error } = useReportedPost(reportId);
  const { mutation: BlockPost, formStatus } = useBlockPost();
  console.log(reportData,'datadata')

  const changeReportStatus = useChangePostReportStatus();

  const handleStatusChange = (status: PostReportStatus) => {
    changeReportStatus.mutate({ reportId, status });
  };

  if (isFetching) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading post details...</p>
        </div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-destructive">
          <AlertTriangle className="h-10 w-10" />
          <p>Failed to load post. Please try again later.</p>
        </div>
      </div>
    );
  }

  const { originalPost, reportDetails } = reportData.reportDetails;

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; icon: React.ReactNode }> =
      {
        PENDING: {
          color: "bg-blue-100 text-blue-800",
          icon: <AlertTriangle className="mr-1 h-3.5 w-3.5" />,
        },
        UNDER_REVIEW: {
          color: "bg-yellow-100 text-yellow-800",
          icon: <Shield className="mr-1 h-3.5 w-3.5" />,
        },
        BLOCKED: {
          color: "bg-red-100 text-red-800",
          icon: <XCircle className="mr-1 h-3.5 w-3.5" />,
        },
        RESOLVED: {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="mr-1 h-3.5 w-3.5" />,
        },
        REJECTED: {
          color: "bg-gray-100 text-gray-800",
          icon: <XCircle className="mr-1 h-3.5 w-3.5" />,
        },
        DELETED: {
          color: "bg-red-200 text-red-900",
          icon: <Trash2 className="mr-1 h-3.5 w-3.5" />,
        },
      };

    const { color, icon } = statusMap[status] || {
      color: "bg-gray-100 text-gray-800",
      icon: null,
    };

    return (
      <div
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${color}`}
      >
        {icon}
        {status}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 shadow-sm">
        <PageTitle route="Posts" subRoute="Post Management" />
      </div>
      <Separator />

      <div className="container mx-auto p-6">
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Report #{reportId.slice(0, 8)}
              </h2>
              <div className="mt-2">{getStatusBadge(reportDetails.status)}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() =>
                        handleStatusChange(PostReportStatus.UNDER_REVIEW)
                      }
                      variant="outline"
                      className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Review
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mark as Under Review</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={()=>{
                        BlockPost.mutate(originalPost.id);
                      }
                      }
                      variant="outline"
                      className="border-red-500 text-red-700 hover:bg-red-50 hover:text-red-800"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      {originalPost.isBlocked ? "Unblock The Post" : "Block The Post"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Block this post</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() =>
                        handleStatusChange(PostReportStatus.RESOLVED)
                      }
                      variant="outline"
                      className="border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Resolve The Report
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mark as Resolved</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() =>
                        handleStatusChange(PostReportStatus.REJECTED)
                      }
                      variant="outline"
                      className="border-gray-500 text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject The Report
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reject this report</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() =>
                        handleStatusChange(PostReportStatus.DELETED)
                      }
                      variant="destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Mark Report as Deleted
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete this post permanently</TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col">
            <h2 className="mb-4 flex items-center text-xl font-bold">
              <div className="mr-2 h-6 w-1 rounded bg-green-500"></div>
              Original Post
            </h2>
            <RenderOriginalPost post={originalPost} />
          </div>
          <div className="flex flex-col">
            <h2 className="mb-4 flex items-center text-xl font-bold">
              <div className="mr-2 h-6 w-1 rounded bg-red-500"></div>
              Report Details
            </h2>
            <RenderReportDetails report={reportDetails} reportId={reportId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;

const RenderReportDetails = ({
  report,
  reportId,
}: {
  report: ReportDetailsType;
  reportId: string;
}) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {},
  );

  return (
    <Card className="h-full w-full overflow-hidden border-red-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-red-100 bg-red-50 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 border-2 border-red-200">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${report.reporter?.username || "User"}`}
            />
            <AvatarFallback>
              {report.reporter?.username?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">
              {report.reporter?.username || "User"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {report.reporter?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="mb-4 rounded-lg border border-red-100 bg-red-50 p-3">
          <p className="text-sm font-medium text-red-800">{report.option}</p>
        </div>

        {report.images.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              Evidence Images
            </h4>
            <Carousel className="w-full">
              <CarouselContent>
                {report.images.map((image: any) => (
                  <CarouselItem key={image.id}>
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200">
                      {!loadedImages[image.id] && (
                        <div className="flex h-full w-full animate-pulse items-center justify-center bg-gray-100">
                          <div className="flex flex-col items-center gap-2">
                            <div className="h-6 w-6 animate-spin rounded-full border-4 border-red-300 border-t-transparent"></div>
                            <span className="text-xs text-gray-500">
                              Loading Image...
                            </span>
                          </div>
                        </div>
                      )}
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt="Report Evidence"
                        className={`h-full w-full object-cover transition-all duration-300 hover:scale-105 ${
                          !loadedImages[image.id] ? "hidden" : "block"
                        }`}
                        onLoad={() =>
                          setLoadedImages((prev) => ({
                            ...prev,
                            [image.id]: true,
                          }))
                        }
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        )}

        <div className="mt-auto">
          <div className="rounded-lg">
            <p className="text-gray-700">{report.reason}</p>
          </div>
          <div className="flex items-center justify-between py-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-red-500" />
              <span>
                Reported on: {new Date(report.createdAt).toLocaleString()}
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              Report #{reportId.slice(0, 6)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RenderOriginalPost = ({ post }: { post: OriginalPost }) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {},
  );
  return (
    <Card className="h-full w-full overflow-hidden border-green-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-green-100 bg-green-50 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 border-2 border-green-200">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.user?.username || "User"}`}
            />
            <AvatarFallback>{post.user?.username?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">
              {post.user?.username || "User"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {post.user?.email || "user@example.com"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Post #{post.id?.slice(0, 6) || "000000"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {post.title}
        </h2>

        {post.images.length > 0 && (
          <div className="mb-6">
            <Carousel className="w-full">
              <CarouselContent>
                {post.images.map((image: any) => (
                  <CarouselItem key={image.id}>
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200">
                      {!loadedImages[image.id] && (
                        <div className="flex h-full w-full animate-pulse items-center justify-center bg-gray-100">
                          <div className="flex flex-col items-center gap-2">
                            <div className="h-6 w-6 animate-spin rounded-full border-4 border-green-300 border-t-transparent"></div>
                            <span className="text-xs text-gray-500">
                              Loading Image...
                            </span>
                          </div>
                        </div>
                      )}
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt="Post Image"
                        className={`h-full w-full object-cover transition-all duration-300 hover:scale-105 ${
                          !loadedImages[image.id] ? "hidden" : "block"
                        }`}
                        onLoad={() =>
                          setLoadedImages((prev) => ({
                            ...prev,
                            [image.id]: true,
                          }))
                        }
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        )}

        <div className="space-y-4">
          <div className="rounded-lg ">
            <p className="text-gray-700">{post.caption}</p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: any) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-sm text-xs font-normal"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm">
                {post.city}, {post.state}, {post.country}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-600" />
              <span className="text-sm">{post.phone_number}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {post.sensitiveMeta?.keywords && (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium text-red-700">
              Sensitive keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.sensitiveMeta.keywords.split(" ").map((keyword, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="rounded-sm border-red-200 bg-red-50 text-xs text-red-800"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-gray-100 bg-gray-50 p-4">
        <div className="flex space-x-4">
          <button className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary">
            <ThumbsUp className="h-5 w-5" />
            <span>{post.numberOfLikes}</span>
          </button>
          <button className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary">
            <MessageCircle className="h-5 w-5" />
            <span>{post.numberOfComments}</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};
