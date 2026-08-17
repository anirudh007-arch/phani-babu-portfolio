import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { EASE_OUT } from '@/lib/motion';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

type ModalProps = {
  onClose: () => void;
  label: string;
  children: ReactNode;
};

/**
 * Full-screen dialog used for the gallery's fullscreen mode.
 *
 * Handles the three things a modal must get right and usually does not:
 * focus moves in on open and returns to the trigger on close, Tab is trapped
 * inside, and Escape always exits. Page scroll (including Lenis) is frozen
 * while it is open.
 */
export function Modal({ onClose, label, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();

    // Focus the panel itself rather than the first control, so screen readers
    // announce the dialog's label before its contents.
    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
      restoreTo.current?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl sm:p-8"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        className="relative max-h-full w-full max-w-5xl overflow-y-auto rounded-[1.75rem] border border-[var(--border)] bg-bg-2 focus:outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="glass-dark absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full text-white transition-colors duration-400 hover:bg-white/15"
        >
          <X size={18} strokeWidth={1.6} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}
