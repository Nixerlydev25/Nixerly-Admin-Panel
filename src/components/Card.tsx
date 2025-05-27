/** @format */

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: { value: string; text: string };
  loading?: boolean;
};

export default function Card({ loading, ...props }: CardProps) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        {/* label */}
        {loading ? (
          <div className="h-6 w-24 rounded bg-gray-300 animate-pulse" />
        ) : (
          <p className="text-xl">{props.label}</p>
        )}
        {/* icon */}
        {loading ? (
          <div className="h-6 w-6 rounded-full bg-gray-300 animate-pulse" />
        ) : (
          <props.icon className="h-6 w-6 font-bold text-gray-400 text-primary" />
        )}
      </section>
      <section className="flex flex-col gap-1">
        {loading ? (
          <>
            <div className="mb-4 h-8 w-32 rounded bg-gray-300 animate-pulse" />
            <div className="h-4 w-40 rounded bg-gray-300 animate-pulse" />
          </>
        ) : (
          <>
            <h2 className="mb-4 text-2xl font-semibold">{props.amount}</h2>
            <p className="text-base text-gray-500">
              <span className="text-[#3EB905] font-semibold mr-2">
                {props.description.value}
              </span>
              {props.description.text}
            </p>
          </>
        )}
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-lg border-2 border-gray-200 p-5",
        props.className
      )}
    />
  );
}