/**
 * Centralized API Configuration for RakNova.
 * Uses process.env.NEXT_PUBLIC_API_URL when deployed (e.g., on Vercel)
 * and falls back to http://127.0.0.1:8000/api/v1 for local development.
 */

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"
).replace(/\/$/, "");

/**
 * Returns a fully qualified API endpoint URL for a given relative path.
 * Example: getApiEndpoint("/ai/resume/analyze") -> "http://127.0.0.1:8000/api/v1/ai/resume/analyze"
 */
export function getApiEndpoint(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath.startsWith("/api/v1")) {
    return `${API_BASE_URL.replace(/\/api\/v1$/, "")}${cleanPath}`;
  }
  return `${API_BASE_URL}${cleanPath}`;
}

/**
 * Smart fetch wrapper that handles IPv4 / IPv6 fallback (127.0.0.1 <-> localhost)
 * to prevent Windows 'Failed to fetch' errors during local development.
 */
export async function smartFetch(path: string, options?: RequestInit): Promise<Response> {
  const primaryUrl = getApiEndpoint(path);
  try {
    return await fetch(primaryUrl, options);
  } catch (err) {
    if (primaryUrl.includes("127.0.0.1")) {
      const fallbackUrl = primaryUrl.replace("127.0.0.1", "localhost");
      try {
        return await fetch(fallbackUrl, options);
      } catch {
        throw err;
      }
    }
    if (primaryUrl.includes("localhost")) {
      const fallbackUrl = primaryUrl.replace("localhost", "127.0.0.1");
      try {
        return await fetch(fallbackUrl, options);
      } catch {
        throw err;
      }
    }
    throw err;
  }
}
