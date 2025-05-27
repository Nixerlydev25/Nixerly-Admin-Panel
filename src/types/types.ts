export * as ServerTypes from "./responses";
export * from "./routes";
export * from "./auth/auth.enums";

export enum ReportStatus {
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
  DELETED = "DELETED",
}


export enum PostReportStatus {
  UNDER_REVIEW = "UNDER_REVIEW",
  BLOCKED = "BLOCKED",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
  DELETED = "DELETED",
}
