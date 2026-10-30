import React from 'react';

export default function DocumentInspector() {
  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
        <h3>Document Preview (PDF / Scan)</h3>
        <div style={{ height: '400px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          [PDF Viewer Area]
        </div>
      </div>
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
        <h3>Extracted AI Data & Verification</h3>
        <div style={{ background: '#ffe6e6', padding: '0.5rem', borderRadius: '4px', color: '#cc0000', marginBottom: '1rem' }}>
          ⚠️ Math Validation Error: Subtotal + Tax does not match Total!
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <label>Invoice Number: <input type="text" defaultValue="INV-2026-001" /></label>
          <label>Subtotal: <input type="number" defaultValue={1000.00} /></label>
          <label>Tax: <input type="number" defaultValue={100.00} /></label>
          <label>Total: <input type="number" defaultValue={1200.00} style={{ borderColor: 'red' }} /></label>
          <button type="button" style={{ padding: '0.5rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '4px' }}>
            Save Manual Corrections
          </button>
        </form>
      </div>
    </div>
  );
}
