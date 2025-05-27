"use client";
import PageTitle from "@/components/PageTitle";
import { Users, Activity, FileText, ThumbsUp } from "lucide-react";
import Card from "@/components/Card";
import { Separator } from "@/components/ui/separator";
import { useDashboardStats } from "@/services/dashboard";

export default function Home() {
  const { data, isFetching, error, refetch } = useDashboardStats();

  // Skeleton cards while loading
  if (isFetching) {
    return (
      <div className="flex w-full flex-col gap-5">
        <div className="p-6">
          <PageTitle route="Analytics" subRoute="Analytics management" />
        </div>
        <Separator className="h-[2px] w-full" />
        <div className="p-6">
          <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                loading
                label=""
                icon={Users}
                amount=""
                description={{ value: "", text: "" }}
              />
            ))}
          </section>
        </div>
      </div>
    );
  }

  // Transform API response into expected format
  const transformedData = data
    ? [
        {
          label: "Total Users",
          amount: data.totalUsers.count.toLocaleString(),
          description: {
            value: `+${data.totalUsers.growthPercentage}%`,
            text: "growth this month",
          },
          icon: Users,
        },
        {
          label: "Total Posts",
          amount: data.totalPosts.count.toLocaleString(),
          description: {
            value: `+${data.totalPosts.growthPercentage}%`,
            text: "growth this month",
          },
          icon: FileText,
        },
        {
          label: "Total Likes",
          amount: data.totalLikes.count.toLocaleString(),
          description: {
            value: `+${data.totalLikes.growthPercentage}%`,
            text: "growth this month",
          },
          icon: ThumbsUp,
        },
        {
          label: "Total Comments",
          amount: data.totalComments.count.toLocaleString(),
          description: {
            value: `+${data.totalComments.growth.toLocaleString()}`,
            text: "growth this month",
          },
          icon: Activity,
        },
      ]
    : [];

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading dashboard stats.</p>
        <button className="mt-2 text-blue-500" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="p-6">
        <PageTitle route="Analytics" subRoute="Analytics management" />
      </div>
      <Separator className="h-[2px] w-full" />
      <div className="p-6">
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
          {transformedData.map((stat, i) => (
            <Card
              key={i}
              amount={stat.amount}
              description={stat.description}
              icon={stat.icon}
              label={stat.label}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
