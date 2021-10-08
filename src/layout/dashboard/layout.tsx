import Overlay from '../_common/overlay';
import TopNavigation from './topnavigation';
import SideNavigation from './sidenavigation';
import LayoutProvider from '../_common/provider';

const style = {
  container: `h-screen overflow-hidden relative`,
  mainContainer: `bg-dashboard flex flex-col h-screen pl-0 w-full lg:w-99`,
  main: `bg-gray-100 h-screen overflow-auto pb-36 pt-4 px-2 md:px-0 md:pb-8 lg:rounded-tl-3xl`,
};

const DashboardLayout = ({ children }) => {
  return (
    <LayoutProvider>
      <div className={style.container}>
        <div className="flex items-start">
          <Overlay />
          <SideNavigation />
          <div className={style.mainContainer}>
            <TopNavigation />
            <main className={style.main}>{children}</main>
          </div>
        </div>
      </div>
    </LayoutProvider>
  );
};

export default DashboardLayout;
