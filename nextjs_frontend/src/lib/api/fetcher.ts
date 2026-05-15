import { getApiBaseUrl } from "@/lib/api/config";
import type { ApiError } from "@/lib/api/types";

/**
 * Convert a fetch Response to a typed JSON result or throw a structured error.
 */
async function parseJsonOrThrow<T>(res: Response): Promise<T> {
  if (res.ok) {
    // Some endpoints may return an empty body.
    const text = await res.text();
    if (!text) return {} as T;
    return JSON.parse(text) as T;
  }

  let details: unknown = undefined;
  try {
    details = await res.json();
  } catch {
    // ignore
  }

  const err: ApiError = {
    message: `Request failed (${res.status})`,
    status: res.status,
    details,
  };
  throw err;
}

export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  token?: string | null;
  body?: unknown;
  signal?: AbortSignal;
  headers?: Record<string, string>;
};

export async function apiRequest<T>(opts: ApiRequestOptions): Promise<T> {
  const base = getApiBaseUrl();
  const url = `${base}${opts.path}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(opts.headers ?? {}),
  };

  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;

  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
    // IMPORTANT: keep client-side auth in memory/localStorage; we don't rely on cookies here.
    credentials: "omit",
  });

  return parseJsonOrThrow<T>(res);
}
