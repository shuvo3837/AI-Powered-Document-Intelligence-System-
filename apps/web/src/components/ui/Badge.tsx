import React from 'react';

export default function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span style={{ backgroundColor: color, color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
      {text}
    </span>
  );
}
