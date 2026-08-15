/**
 * Thin API client shell.
 *
 * The assignment's frontend currently runs against local mock data (see
 * lib/mock). Every module in lib/api mirrors the shape a real NestJS
 * endpoint would return, so swapping MOCK_MODE off and pointing BASE_URL
 * at the backend is the only change required to go live.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export const MOCK_MODE = true;

/** Simulates network latency so loading states are visible in the UI. */
export function withLatency<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (!response.ok) {
    throw new ApiError(`Request to ${path} failed`, response.status);
  }

  return response.json() as Promise<T>;
}
