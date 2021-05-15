import { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import Props from '@/utils/defaultProps';

interface NavbarProps extends Props {
  className?: string;
}

interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

interface NavbarBrandProps extends NavbarLinkProps {}

const style = {
  navbar: `font-light relative flex items-center flex-row justify-start`,
  brand: `inline-block text-3xl -ml-5 md:text-4xl font-normal whitespace-nowrap`,
  collapse: `hidden lg:flex-grow lg:items-center lg:flex`,
  nav: `block pl-0 mb-0 ml-auto md:flex md:pl-0 md:mb-0`,
  link: `px-6 -mb-1 font-normal block`,
};

const Navbar = ({ className, children }: NavbarProps) => (
  <nav className={`${className} ${style.navbar}`}>{children}</nav>
);

Navbar.Brand = ({ children, href }: NavbarBrandProps) => (
  <Link href={href}>
    <a className={style.brand}>
      <strong>{children}</strong>
    </a>
  </Link>
);

Navbar.Collapse = ({ children }: Props) => (
  <div className={style.collapse}>{children}</div>
);

Navbar.Nav = ({ children }: Props) => <ul className={style.nav}>{children}</ul>;
Navbar.Item = ({ children }: Props) => <li>{children}</li>;

Navbar.Link = ({ children, href, ...props }: NavbarLinkProps) => (
  <>
    {href ? (
      <Link href={href}>
        <a {...props} className={style.link}>
          {children}
        </a>
      </Link>
    ) : (
      <a className={style.link}>{children}</a>
    )}
  </>
);

export default Navbar;
