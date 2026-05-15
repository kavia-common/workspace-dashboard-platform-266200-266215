export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};

export type HealthResponse = {
  ok: boolean;
  backendReachable: boolean;
};

export type WorkspaceSummary = {
  workspaceId: string;
  workspaceName: string;
  timeRangeLabel: string;

  totalEvents: number;
  activeUsers: number;
  conversionRate: number; // 0..1
};

export type TimeseriesPoint = {
  t: string; // ISO date
  value: number;
};

export type TopEvent = {
  name: string;
  count: number;
};
