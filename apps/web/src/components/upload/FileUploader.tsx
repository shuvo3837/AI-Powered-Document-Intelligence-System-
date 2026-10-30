'use client';

import { AlertCircle, Check, FileText, Loader2, Plus, Trash2, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { uploadDocument } from '../../lib/api';

type UploadState = 'selected' | 'uploading' | 'queued' | 'failed';

interface QueuedFile {
  id: string;
  file: File;
  state: UploadState;
  jobId?: string;
  message?: string;
}

const supportedExtensions = new Set(['pdf', 'jpg', 'jpeg', 'png', 'tif', 'tiff', 'xlsx', 'xls', 'csv']);
const acceptedFormats = ['PDF', 'JPG', 'PNG', 'TIFF', 'XLSX', 'XLS', 'CSV'];

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileExtension(file: File) {
  return file.name.split('.').pop()?.toLowerCase() ?? '';
}

export default function FileUploader() {
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList);
    const unsupported = incoming.filter((file) => !supportedExtensions.has(fileExtension(file)));
    if (unsupported.length > 0) {
      setError(`Unsupported file type${unsupported.length === 1 ? '' : 's'}: ${unsupported.map((file) => file.name).join(', ')}.`);
    } else {
      setError(null);
    }

    const accepted = incoming.filter((file) => supportedExtensions.has(fileExtension(file)));
    setFiles((current) => [
      ...current,
      ...accepted.map((file, index) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
        file,
        state: 'selected' as const,
      })),
    ]);
  }

  async function handleUpload() {
    const pending = files.filter((entry) => entry.state === 'selected' || entry.state === 'failed');
    if (pending.length === 0 || uploading) return;

    setUploading(true);
    setError(null);
    for (const entry of pending) {
      setFiles((current) =>
        current.map((item) => item.id === entry.id ? { ...item, state: 'uploading', message: undefined } : item),
      );
      try {
        const job = await uploadDocument(entry.file);
        setFiles((current) =>
          current.map((item) => item.id === entry.id ? { ...item, state: 'queued', jobId: job.jobId, message: job.status } : item),
        );
      } catch (uploadError) {
        const message = uploadError instanceof Error ? uploadError.message : 'Upload failed. Please try again.';
        setFiles((current) =>
          current.map((item) => item.id === entry.id ? { ...item, state: 'failed', message } : item),
        );
      }
    }
    setUploading(false);
  }

  const pendingCount = files.filter((entry) => entry.state === 'selected' || entry.state === 'failed').length;

  return (
    <section className="panel" id="upload" aria-labelledby="upload-title">
      <div className="panel-header">
        <div>
          <h2 id="upload-title">Upload documents</h2>
          <p>Send documents to your processing pipeline.</p>
        </div>
        <span className="state-pill state-pill-neutral">MULTIPLE FILES</span>
      </div>
      <div className="panel-body">
        <div
          className={`upload-dropzone${dragging ? ' upload-dropzone-dragging' : ''}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            addFiles(event.dataTransfer.files);
          }}
        >
          <input
            ref={inputRef}
            className="upload-input"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.tif,.tiff,.xlsx,.xls,.csv"
            aria-label="Choose documents to upload"
            onChange={(event) => {
              if (event.target.files) addFiles(event.target.files);
              event.target.value = '';
            }}
          />
          <div>
            <div className="upload-icon"><UploadCloud size={21} /></div>
            <h3>Drop your documents here</h3>
            <p>or <button className="upload-select" type="button" onClick={() => inputRef.current?.click()}>browse files</button> from your computer</p>
            <div className="format-list" aria-label="Supported file formats">
              {acceptedFormats.map((format) => <span className="format-chip" key={format}>{format}</span>)}
            </div>
          </div>
        </div>

        {error && <div className="upload-error" role="alert">{error}</div>}

        {files.length > 0 && (
          <div className="file-list" aria-live="polite">
            {files.map((entry) => (
              <div className="file-row" key={entry.id}>
                <div className="file-type-icon"><FileText size={16} /></div>
                <div className="file-meta">
                  <div className="file-name" title={entry.file.name}>{entry.file.name}</div>
                  <div className="file-subtitle">{formatBytes(entry.file.size)} · {fileExtension(entry.file).toUpperCase()}</div>
                  {entry.message && entry.state === 'failed' && <div className="file-subtitle file-state-failed">{entry.message}</div>}
                  {entry.jobId && <div className="file-subtitle">Job ID: {entry.jobId}</div>}
                </div>
                <span className={`file-state${entry.state === 'queued' ? ' file-state-queued' : entry.state === 'failed' ? ' file-state-failed' : ''}`}>
                  {entry.state === 'uploading' && <Loader2 size={13} className="spinner" />}
                  {entry.state === 'queued' && <Check size={13} />}
                  {entry.state === 'failed' && <AlertCircle size={13} />}
                  {entry.state === 'selected' ? 'Ready' : entry.state === 'uploading' ? 'Uploading' : entry.state === 'queued' ? (entry.message || 'Queued') : 'Failed'}
                </span>
                {(entry.state === 'selected' || entry.state === 'failed') && (
                  <button
                    className="icon-button file-actions"
                    type="button"
                    aria-label={`Remove ${entry.file.name}`}
                    onClick={() => setFiles((current) => current.filter((item) => item.id !== entry.id))}
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="upload-footer">
          <small>Uploads are sent to the configured document API. Processing progress appears only when the API reports it.</small>
          <div className="file-actions">
            {files.length > 0 && !uploading && (
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setFiles((current) => current.filter((entry) => entry.state !== 'selected' && entry.state !== 'failed'))}
              >
                Clear pending
              </button>
            )}
            <button
              className="button button-primary"
              type="button"
              disabled={pendingCount === 0 || uploading}
              onClick={handleUpload}
            >
              {uploading ? <Loader2 size={15} className="spinner" /> : <Plus size={15} />}
              {uploading ? 'Uploading…' : pendingCount > 0 ? `Upload ${pendingCount} ${pendingCount === 1 ? 'file' : 'files'}` : 'Select documents'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
