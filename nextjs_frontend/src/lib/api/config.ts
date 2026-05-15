export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!url) {
    // In CI/static export contexts, allow empty and fall back to same-origin.
    return "";
  }
  return url.replace(/\/+$/, "");
}
