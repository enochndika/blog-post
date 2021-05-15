import Link from 'next/link';
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import Props from '@/utils/defaultProps';
import { useRouter } from 'next/router';

interface DropdownToggleProps extends Props {
  className?: string;
}

interface DropdownMenuProps extends Props {
  left?: boolean;
}

interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  href?: string;
  locale?: string;
}

const inlineStyle = {
  left: {
    transform: 'translate3d(-140px, 0px, 0px)',
  },
  bottom: {
    transform: 'translate3d(0px, 3px, 0px)',
  },
};

const style = {
  menu: `absolute text-left top-0 left-0 block z-40 bg-white dark:bg-black float-left py-2 px-0 border border-gray-300 rounded-sm mt-0.5 mb-0 mx-0 bg-clip-padding`,
  item: `block w-full cursor-pointer clear-both py-2 px-8 text-sm font-normal whitespace-nowrap border-0 hover:bg-gray-200 dark:hover:bg-gray-700`,
};

const useToggle = () => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const toggle = () => {
    setShow(!show);
  };
  // close dropdown when you click outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [show, ref]);

  useEffect(() => {
    const handleRouteChange = () => {
      setShow(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });
  // close dropdown when you click on "ESC" key
  useEffect(() => {
    const handleEscape = (event) => {
      if (!show) return;
      if (event.key === 'Escape') {
        setShow(false);
      }
    };
    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [show]);
  return {
    show,
    toggle,
    ref,
  };
};

const Dropdown = ({ children }: Props) => {
  const { toggle, ref, show } = useToggle();
  const firstChild = children[0];
  const secondChild = children[1];

  return (
    <div>
      <div onClick={toggle} className="cursor-pointer">
        {firstChild}
      </div>
      {show && (
        <div className="relative block" ref={ref}>
          {secondChild}
        </div>
      )}
    </div>
  );
};

Dropdown.Toggle = ({ children, className }: DropdownToggleProps) => (
  <button className={`${className} font-normal`}>{children}</button>
);

Dropdown.Menu = ({ children, left }: DropdownMenuProps) => (
  <div
    className={style.menu}
    style={left ? inlineStyle.left : inlineStyle.bottom}
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="options-menu"
  >
    {children}
  </div>
);

Dropdown.Item = ({ children, href, locale, ...props }: DropdownItemProps) => {
  return (
    <>
      {href ? (
        <Link href={href} locale={locale} passHref={true}>
          <div {...props} className={style.item}>
            {children}
          </div>
        </Link>
      ) : (
        <div {...props} className={style.item}>
          {children}
        </div>
      )}
    </>
  );
};

export default Dropdown;
