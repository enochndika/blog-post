import Portal from '@reach/portal';
import { useEffect, useRef } from 'react';
import Props from '@/utils/defaultProps';
import style from './modal.module.css';

interface ModalProps extends Props {
  isOpen: boolean;
  toggle?: (open: boolean) => void;
  backdrop: boolean;
  padding?: string | boolean;
}

interface ModalBody extends Props {
  className?: string;
}

const Modal = ({ children, isOpen, toggle, backdrop, padding }: ModalProps) => {
  const ref = useRef<HTMLDivElement>();

  // close modal when you click outside the dialog
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (backdrop && !ref.current?.contains(event.target)) {
        if (!isOpen) return;
        toggle(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isOpen, ref]);

  // close modal when you click on "ESC" key
  useEffect(() => {
    const handleEscape = (event) => {
      if (!isOpen) return;
      if (event.key === 'Escape') {
        toggle(false);
      }
    };
    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [isOpen]);

  // Put focus on modal dialogue, hide scrollbar and prevent body from moving when modal is open
  useEffect(() => {
    if (!isOpen) return;

    ref.current?.focus();
    const html = document.documentElement;
    const overflow = html.style.overflow;

    const paddingRight = html.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    html.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      html.style.overflow = overflow;
      html.style.paddingRight = paddingRight;
    };
  }, [isOpen]);

  return (
    <Portal>
      {isOpen && (
        <div className="container">
          <div className={style.backdrop} />
          <div className={style.container}>
            <div
              className={`${style.orientation} ${
                padding ? padding : ' md:pt-12'
              }`}
              ref={backdrop ? ref : null}
              role="dialogue"
              aria-modal={true}
            >
              <div className={`${style.content} dark:bg-gray-800`}>
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

Modal.Header = ({ children }: Props) => (
  <div className={style.header}>
    <h4 className={style.headerTitle}>{children}</h4>
  </div>
);

Modal.Body = ({ children, className }: ModalBody) => (
  <div className={`${className} ${style.body}`}>{children}</div>
);

Modal.Footer = ({ children }: Props) => (
  <div className={style.footer}>{children}</div>
);

export default Modal;
