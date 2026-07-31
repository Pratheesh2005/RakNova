/**
 * Centralized API Configuration for RakNova.
 * Uses process.env.NEXT_PUBLIC_API_URL when deployed (e.g., on Vercel)
 * and falls back to http://localhost:8000/api/v1 for local development.
 */

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
).replace(/\/$/, "");

/**
 * Returns a fully qualified API endpoint URL for a given relative path.
 * Example: getApiEndpoint("/ai/resume/analyze") -> "http://localhost:8000/api/v1/ai/resume/analyze"
 */
export function getApiEndpoint(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath.startsWith("/api/v1")) {
    return `${API_BASE_URL.replace(/\/api\/v1$/, "")}${cleanPath}`;
  }
  return `${API_BASE_URL}${cleanPath}`;
}
