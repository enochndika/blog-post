import { useEffect, useRef } from 'react';
import Props from '@/utils/defaultProps';

interface SidenavProps extends Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const style = {
  default: `block h-screen fixed z-40 top-0 right-0 bg-white dark:text-white dark:bg-darker text-gray-600 lg:hidden`,
  open: `w-8/12 md:w-6/12 transition-all ease duration-200 overflow-x-hidden`,
  close: `w-0 transition-all ease duration-200 overflow-x-hidden`,
};

export const Sidenav = ({ isOpen, setIsOpen, children }: SidenavProps) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      if (!ref.current?.contains(event.target)) {
        if (!isOpen) return;
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, ref]);

  return (
    <aside
      ref={ref}
      className={`${style.default} ${isOpen ? style.open : style.close}`}
    >
      <div className="mt-8">{children}</div>
    </aside>
  );
};

Sidenav.Item = ({ children }: Props) => (
  <div className="cursor-pointer font-normal ml-8 mb-8">{children}</div>
);
