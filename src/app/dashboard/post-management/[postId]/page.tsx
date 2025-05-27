"use client";

import type React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  ThumbsUp,
  Share,
  MoreVertical,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  useBlockPost,
  useSinglePost,
} from "@/services/postReports/postReports.hooks";
import { useState } from "react";

const PostDetails: React.FC = () => {
  const params = useParams();
  const postId = params.postId as string;

  const { data: post, isFetching, error } = useSinglePost(postId);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {},
  );
  const { mutation, formStatus } = useBlockPost();

  if (isFetching) {
    return <p className="text-center text-gray-500">Loading post details...</p>;
  }

  if (error || !post) {
    return <p className="text-center text-red-500">Failed to load post.</p>;
  }

  return (
    <div>
      <div className="p-6">
        <PageTitle route="Posts" subRoute="Post Management" />
      </div>
      <Separator />
      <div className="container mx-auto max-w-4xl p-6">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.user.username}`}
                />
                <AvatarFallback>{post.user.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{post.user.username}</h3>
                <p className="text-sm text-muted-foreground">
                  {post.user.email}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full p-2 hover:bg-accent">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    mutation.mutate(post.id);
                  }}
                >
                  {post.isBlocked ? "Unblock" : "Block"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="pb-0">
            <h2 className="mb-4 text-2xl font-bold">{post.title}</h2>

            {post.images.length > 0 && (
              <Carousel className="w-full">
                <CarouselContent>
                  {post.images.map((image) => (
                    <CarouselItem key={image.id}>
                      <div className="relative w-full">
                        {/* Show loading placeholder until the image has loaded */}
                        {!loadedImages[image.id] && (
                          <div className="flex h-full w-full animate-pulse items-center justify-center bg-gray-200">
                            Loading Image...
                          </div>
                        )}
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt="Post Image"
                          className={`transition-transform duration-300 hover:scale-105 ${
                            !loadedImages[image.id] ? "hidden" : "block"
                          } w-full h-auto`}
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
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}

            <div className="mt-6 space-y-4">
              <p className="text-muted-foreground">{post.caption}</p>

              <Separator className="my-4"></Separator>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="text-md rounded-sm"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between py-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {post.city}, {post.state || 'N/A'}, {post.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{post.phone_number || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.created_at).toLocaleString()}</span>
                </div>
              </div>
              {post.sensitiveMeta && post.sensitiveMeta.length > 0 && (
                <>
                  <p>Sensitive keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {post.sensitiveMeta.map((meta, index) => (
                      <Badge
                        key={`${meta.field}-${index}`}
                        variant="secondary"
                        className="text-md rounded-sm"
                      >
                        {meta.keywords}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>

          <CardFooter className="m-10 flex items-center justify-between pt-4">
            <div className="flex space-x-4">
              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                <ThumbsUp className="h-5 w-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                <MessageCircle className="h-5 w-5" />
                <span>{post._count.comments}</span>
              </button>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                <Share className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PostDetails;
