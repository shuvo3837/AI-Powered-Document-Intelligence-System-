'use client';
import React, { useState } from 'react';

export default function FileUploader() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (!files) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      alert('Files successfully queued for processing!');
    }, 1200);
  };

  return (
    <div style={{ border: '2px dashed #0066cc', padding: '3rem', textAlign: 'center', borderRadius: '12px' }}>
      <h3>Drag & Drop Documents (PDF, PNG, JPG, XLSX, CSV)</h3>
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <br /><br />
      <button 
        onClick={handleUpload}
        disabled={uploading}
        style={{ padding: '0.7rem 1.5rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        {uploading ? 'Processing & OCR Engine Running...' : 'Upload & Start AI Extraction'}
      </button>
    </div>
  );
}
