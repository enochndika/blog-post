import SidenavItems from './items';
import SidenavHeader from './header';
import css from './index.module.css';
import { useToggle } from '../../_common/provider';

const style = {
  mobilePosition: {
    right: 'right-0',
  },
  close: `hidden`,
  container: `pb-32 lg:pb-12`,
  open: `absolute w-8/12 z-40 sm:w-5/12`,
  default: `bg-dashboard h-screen overflow-y-auto top-0 lg:flex lg:relative lg:w-72 lg:z-auto`,
};

const SideNavigation = () => {
  const { open, ref } = useToggle();
  return (
    <aside
      ref={ref}
      className={`${style.default} ${style.mobilePosition.right} 
        ${open ? style.open : style.close} ${css.scrollbar}`}
    >
      <div className={style.container}>
        <SidenavHeader />
        <SidenavItems />
      </div>
    </aside>
  );
};

export default SideNavigation;
