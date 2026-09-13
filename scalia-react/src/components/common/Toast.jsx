import React from 'react';
import { useScalia } from '../../context/ScaliaContext';

export const Toast = () => {
  const { toast } = useScalia();

  if (!toast.show) return null;

  return (
    <div
      className="scalia-toast"
      style={{
        display: 'flex',
        borderLeft: toast.isError ? '4px solid #ef4444' : '4px solid var(--accent-emerald)',
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
        position: 'fixed',
        bottom: '80px',
        right: '24px',
        zIndex: 9999,
        borderRadius: '12px',
        padding: '14px 18px',
        maxWidth: '380px',
        animation: 'slideInUp 0.3s ease'
      }}
    >
      <div style={{ marginRight: '12px', fontSize: '1.4rem', color: toast.isError ? '#ef4444' : 'var(--accent-emerald)' }}>
        <i className={toast.isError ? 'ri-error-warning-line' : 'ri-checkbox-circle-line'}></i>
      </div>
      <div>
        <h4 style={{ margin: '0 0 4px', fontSize: '0.92rem', fontWeight: 700 }}>{toast.title}</h4>
        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{toast.message}</p>
      </div>
    </div>
  );
};
