export class ApiError extends Error {
  readonly status: number;
  readonly errorCode: string;
  readonly errorDetails: unknown;

  constructor(status: number, errorCode: string, message: string, errorDetails?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errorCode = errorCode;
    this.errorDetails = errorDetails;
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  meta: {
    requestId: string;
    timestamp: number;
  };
}

interface ApiErrorEnvelope {
  success: boolean;
  statusCode: number;
  errorCode?: string;
  message?: string;
  errorDetails?: unknown;
}

const DEFAULT_BASE_URL = 'http://localhost:3000/api/v1';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL;

const REQUEST_TIMEOUT_MS = 15_000;

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken(): string | null {
  return authToken;
}

type BackendStatusListener = (isOnline: boolean) => void;

const statusListeners = new Set<BackendStatusListener>();
let lastRequestSucceeded = true;

export function subscribeBackendStatus(listener: BackendStatusListener): () => void {
  statusListeners.add(listener);
  return () => {
    statusListeners.delete(listener);
  };
}

export function getBackendOnline(): boolean {
  return lastRequestSucceeded;
}

export async function checkBackendHealth(): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    const response = await fetch(`${API_BASE_URL}/analytics/kpi-metrics`, {
      method: 'GET',
      headers,
      signal: controller.signal,
    });
    const isOnline = response.ok || response.status === 401 || response.status === 403;
    reportBackendStatus(isOnline);
    return isOnline;
  } catch {
    reportBackendStatus(false);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

function reportBackendStatus(isOnline: boolean) {
  if (lastRequestSucceeded === isOnline) {
    return;
  }
  lastRequestSucceeded = isOnline;
  statusListeners.forEach((listener) => listener(isOnline));
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
      signal: controller.signal,
    });
    // Response diterima = backend online (apa pun status HTTP-nya)
    reportBackendStatus(true);
  } catch (error) {
    reportBackendStatus(false);
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError(0, 'ERR_REQUEST_TIMEOUT', 'Waktu permintaan habis. Backend tidak merespons.');
    }
    throw new ApiError(0, 'ERR_NETWORK', 'Tidak dapat terhubung ke server backend. Pastikan service berjalan.');
  } finally {
    clearTimeout(timeoutId);
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // Response tanpa body JSON
  }

  if (!response.ok) {
    const envelope = body as ApiErrorEnvelope | null;
    throw new ApiError(
      response.status,
      envelope?.errorCode ?? `HTTP_${response.status}`,
      envelope?.message ?? 'Terjadi kesalahan pada server.',
      envelope?.errorDetails,
    );
  }

  const envelope = body as ApiEnvelope<T>;
  if (envelope && typeof envelope === 'object' && 'success' in envelope) {
    return envelope.data;
  }
  return body as T;
}

export const apiClient = {
  get<T>(path: string): Promise<T> {
    return request<T>(path, { method: 'GET' });
  },
  post<T>(path: string, data?: unknown): Promise<T> {
    return request<T>(path, {
      method: 'POST',
      body: data === undefined ? undefined : JSON.stringify(data),
    });
  },
};
