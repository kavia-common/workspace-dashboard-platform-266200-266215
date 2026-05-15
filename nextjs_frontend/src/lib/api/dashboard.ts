import type {
  HealthResponse,
  TimeseriesPoint,
  TopEvent,
  WorkspaceSummary,
} from "@/lib/api/types";
import { apiRequest } from "@/lib/api/fetcher";

function isoDay(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function mockSummary(): WorkspaceSummary {
  return {
    workspaceId: "ws_demo",
    workspaceName: "Demo Workspace",
    timeRangeLabel: "Last 14 days",
    totalEvents: 48231,
    activeUsers: 1294,
    conversionRate: 0.043,
  };
}

function mockTimeseries(): TimeseriesPoint[] {
  const pts: TimeseriesPoint[] = [];
  for (let i = -13; i <= 0; i += 1) {
    pts.push({
      t: isoDay(i),
      value: Math.round(2200 + (Math.sin(i / 2) + 1) * 750 + Math.random() * 220),
    });
  }
  return pts;
}

function mockTopEvents(): TopEvent[] {
  return [
    { name: "page_view", count: 18231 },
    { name: "signup_start", count: 4921 },
    { name: "signup_complete", count: 1320 },
    { name: "purchase", count: 410 },
  ];
}

/**
 * Backend currently only exposes `/` (health check). We treat that as a reachability probe.
 */
export async function getHealth(): Promise<HealthResponse> {
  try {
    await apiRequest<unknown>({ path: "/" });
    return { ok: true, backendReachable: true };
  } catch {
    return { ok: false, backendReachable: false };
  }
}

/**
 * In MVP, we provide mock analytics if backend endpoints aren't present yet.
 * Once backend adds real dashboard endpoints, switch to calling them here.
 */
export async function getWorkspaceDashboard(): Promise<{
  summary: WorkspaceSummary;
  timeseries: TimeseriesPoint[];
  topEvents: TopEvent[];
  usingMockData: boolean;
}> {
  // TODO (when backend is implemented): call real endpoints, e.g.
  // const summary = await apiRequest<WorkspaceSummary>({ path: "/dashboard/summary", token });
  // ...

  const health = await getHealth();
  if (!health.backendReachable) {
    return {
      summary: mockSummary(),
      timeseries: mockTimeseries(),
      topEvents: mockTopEvents(),
      usingMockData: true,
    };
  }

  // Backend reachable but doesn't provide analytics endpoints yet: still return mock.
  return {
    summary: mockSummary(),
    timeseries: mockTimeseries(),
    topEvents: mockTopEvents(),
    usingMockData: true,
  };
}
