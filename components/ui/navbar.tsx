import Link from "next/link";
import Props from "../../utils/defaultProps";
import { AnchorHTMLAttributes } from "react";

interface NavbarProps extends Props {
  className?: string;
}

interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

const Navbar = ({ className, children }: NavbarProps) => {
  return (
    <nav
      className={`${className} font-light relative flex items-center flex-row justify-start`}
    >
      {children}
    </nav>
  );
};

Navbar.Brand = ({ children }: Props) => (
  <div className="inline-block cursor-pointer text-3xl -ml-5 md:text-4xl font-normal whitespace-nowrap">
    <strong>{children}</strong>
  </div>
);

Navbar.Collapse = ({ children }: Props) => {
  return (
    <div className={`hidden lg:flex-grow lg:items-center lg:flex`}>
      {children}
    </div>
  );
};

Navbar.Nav = ({ children }: Props) => {
  return (
    <ul className="block pl-0 mb-0 ml-auto md:flex md:pl-0 md:mb-0">
      {children}
    </ul>
  );
};

Navbar.Item = ({ children }: Props) => <li>{children}</li>;

Navbar.Link = ({ children, href, ...props }: NavbarLinkProps) => (
  <div className="cursor-pointer px-6 -mb-1 font-normal">
    {href ? (
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    ) : (
      <>{children}</>
    )}
  </div>
);

export default Navbar;
