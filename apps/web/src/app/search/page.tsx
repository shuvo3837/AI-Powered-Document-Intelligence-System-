import React from 'react';

export default function SearchPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Document Semantic & Keyword Search</h2>
      <input 
        type="text" 
        placeholder="Search by invoice number, vendor, or context (e.g. 'Cloud services paid in March')..." 
        style={{ width: '80%', padding: '0.8rem', fontSize: '1rem', marginBottom: '1.5rem' }}
      />
      <div style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '6px' }}>
        <h4>INV-2026-001 - Acme Global Solutions</h4>
        <p>Matched snippet: "...Cloud Hosting Service - Subtotal $1000.00..."</p>
      </div>
    </div>
  );
}
