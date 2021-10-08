import Props from '@/utils/defaultProps';
import { useToggle } from '@/layout/_common/provider';

interface SidenavProps extends Props {}

const style = {
  default: `block h-screen fixed z-40 top-0 right-0 bg-white dark:text-white dark:bg-darker text-gray-600 lg:hidden`,
  open: `w-8/12 md:w-6/12 transition-all ease duration-200 overflow-x-hidden`,
  close: `w-0 transition-all ease duration-200 overflow-x-hidden`,
};

export const Sidenav = ({ children }: SidenavProps) => {
  const { open, ref } = useToggle();

  return (
    <aside
      ref={ref}
      className={`${style.default} ${open ? style.open : style.close}`}
    >
      <div className="mt-8">{children}</div>
    </aside>
  );
};

Sidenav.Item = ({ children }: Props) => (
  <div className="mb-8 ml-8 font-normal cursor-pointer">{children}</div>
);
