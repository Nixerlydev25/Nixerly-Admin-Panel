import { ReportStatus } from "@/types/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
}

export function truncateString(str:string, num:number) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}


export const getStatusStyles = (status: ReportStatus) => {
  switch (status) {
    case ReportStatus.PENDING:
      return "bg-yellow-100 text-yellow-600";
    case ReportStatus.UNDER_REVIEW:
      return "bg-blue-100 text-blue-600";
    case ReportStatus.RESOLVED:
      return "bg-green-100 text-green-600";
    case ReportStatus.REJECTED:
      return "bg-red-100 text-red-600";
    case ReportStatus.DELETED:
      return "bg-gray-100 text-gray-600";
    default:
      return "";
  }
};
