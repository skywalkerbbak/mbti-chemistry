import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-gray-900/95 text-white shadow-2xl backdrop-blur-sm border border-gray-700/60 max-w-[90vw] animate-bounce-in"
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="text-sm font-medium tracking-tight">{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="ml-1.5 p-0.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
