import Portal from '@reach/portal';
import { useEffect, useRef } from 'react';
import Props from '../../utils/defaultProps';

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

  return (
    <Portal>
      {isOpen && (
        <div className="container">
          <div className="fixed top-0 left-0 z-40 w-screen h-screen bg-black opacity-50" />
          <div className="fixed top-0 left-0 z-40 w-full h-full m-0">
            <div
              className={`${positions.default} ${
                padding ? padding : ' md:pt-12'
              }`}
              ref={backdrop ? ref : null}
              role="dialogue"
              aria-modal={true}
            >
              <div
                className={`${animations.default} relative flex flex-col bg-white dark:bg-gray-800 pointer-events-auto`}
              >
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
  <div className="items-start justify-between p-4 border-b border-gray-300">
    <h4 className="text-2xl md:text-3xl font-light">{children}</h4>
  </div>
);

Modal.Body = ({ children, className }: ModalBody) => (
  <div className={`${className} flex-shrink flex-grow p-4`}>{children}</div>
);

Modal.Footer = ({ children }: Props) => (
  <div className="flex flex-wrap items-center justify-end p-3 border-t border-gray-300">
    {children}
  </div>
);

const positions = {
  default: 'mt-96 mx-8 md:m-auto md:w-4/12 ',
};

const animations = {
  default: 'animate-modal-top',
};

export default Modal;
