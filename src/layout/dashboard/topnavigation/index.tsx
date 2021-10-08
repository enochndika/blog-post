import Link from 'next/link';
import { useToggle } from '../../_common/provider';
import HomeIcon from '@/components/icons/others/home';
import PowerOffIcon from '@/components/icons/others/powerOff';

const TopNavigation = () => {
  const { toggle } = useToggle();
  return (
    <header className="relative z-10 items-center w-full h-16 bg-dashboard">
      <div className="relative flex flex-col justify-center mx-auto px-3 h-full">
        <div className="lg:max-w-68 relative flex items-center pl-1 w-full sm:ml-0 sm:pr-2">
          <div className="relative left-0 flex w-3/4">
            <div className="group relative flex items-center w-12 h-full">
              <button
                type="button"
                aria-expanded="false"
                aria-label="Toggle sidenav"
                onClick={toggle}
                className="text-white text-4xl focus:outline-none lg:hidden"
              >
                &#8801;
              </button>
            </div>
          </div>
          <div className="relative flex items-center justify-end ml-5 p-1 w-full sm:right-auto sm:mr-0">
            <div className="block pr-5">
              <Link href="/">
                <a className="block px-2 py-2 w-8 h-8 bg-indigo-900 rounded-full">
                  <HomeIcon className="w-full h-full text-white" />
                </a>
              </Link>
            </div>
            <div className="block pr-5">
              <Link href="/">
                <a className="block px-2 py-2 w-8 h-8 bg-indigo-900 rounded-full">
                  <PowerOffIcon className="w-full h-full text-white" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
