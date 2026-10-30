export async function fetchDocumentStatus(jobId: string) {
  const res = await fetch(`/api/documents/status/${jobId}`);
  return res.json();
}
