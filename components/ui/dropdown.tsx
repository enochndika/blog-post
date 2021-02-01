import {
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import Props from "../../utils/defaultProps";

interface DropdownToggleProps extends Props {
  className?: string;
}

interface DropdownMenuProps extends Props {
  left?: boolean;
}

interface DropdownItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

const useToggle = () => {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggle = () => {
    setShow((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    router.events.on("routeChangeComplete", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      router.events.off("routeChangeComplete", handleOutsideClick);
    };
  }, [show, ref]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (!show) return;
      if (event.key === "Escape") {
        setShow(false);
      }
    };
    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [show]);

  return {
    show,
    toggle,
    ref,
  };
};

const styles = {
  left: {
    transform: "translate3d(-140px, 0px, 0px)",
  },
  bottom: {
    transform: "translate3d(0px, 3px, 0px)",
  },
};

const Dropdown = ({ children }: Props) => {
  const firstChild = children[0];
  const secondChild = children[1];
  const { ref, show, toggle } = useToggle();
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

Dropdown.Toggle = ({ children, className }: DropdownToggleProps) => {
  return <div className={`${className} font-normal`}>{children}</div>;
};

Dropdown.Menu = ({ children, left }: DropdownMenuProps) => (
  <ul
    style={left ? styles.left : styles.bottom}
    className="block z-40 absolute top-0 left-0  bg-white dark:bg-black float-left py-2 px-0 text-left border border-gray-300 rounded-sm mt-0.5 mb-0 mx-0 bg-clip-padding"
  >
    {children}
  </ul>
);

Dropdown.Item = ({ children, ...props }: DropdownItemProps) => (
  <li
    {...props}
    className="block w-full py-2 px-8 text-sm font-normal clear-both whitespace-nowrap border-0 hover:bg-gray-200 dark:hover:bg-gray-700  cursor-pointer"
  >
    {children}
  </li>
);

export default Dropdown;
