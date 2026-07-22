import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function Modal({ children, isOpen, onClose, title }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-gray-800 bg-gray-900 shadow-2xl shadow-black/40"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4 border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
          <button
            aria-label="Fechar modal"
            className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-100"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
