import React from 'react';
import FileUploader from '../components/upload/FileUploader';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AI Document Intelligence System</h1>
      <p>Automated Extraction, OCR, Math Validation, and Semantic Search</p>
      <hr style={{ margin: '1.5rem 0' }} />
      <FileUploader />
    </main>
  );
}
