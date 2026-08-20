import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          {toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
          <div style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</div>
          <button 
            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.8 }}
            onClick={() => onDismiss(toast.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
