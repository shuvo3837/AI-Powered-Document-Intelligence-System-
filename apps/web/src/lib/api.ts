const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export interface UploadJob {
  jobId: string;
  status: string;
}

export interface DocumentSearchResult {
  id: string;
  filename: string;
  score?: number;
  text_snippet?: string;
}

export interface DocumentSearchResponse {
  query: string;
  type: string;
  results: DocumentSearchResult[];
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, init);
  } catch {
    throw new Error('Unable to connect to the document service. Check that the backend is running and try again.');
  }

  if (!response.ok) {
    throw new Error(`The document service could not complete the request (HTTP ${response.status}).`);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error('The document service returned an unreadable response.');
  }
}

export function uploadDocument(file: File): Promise<UploadJob> {
  const body = new FormData();
  body.append('file', file);
  return requestJson<UploadJob>('/api/documents/upload', { method: 'POST', body });
}

export function searchDocuments(query: string): Promise<DocumentSearchResponse> {
  const params = new URLSearchParams({ q: query });
  return requestJson<DocumentSearchResponse>(`/api/documents/search?${params.toString()}`);
}

export function fetchDocumentStatus(jobId: string) {
  return requestJson<{ status: string; progress?: number }>(
    `/api/documents/status/${encodeURIComponent(jobId)}`,
  );
}
