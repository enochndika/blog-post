import { ComponentType, Fragment, useState } from 'react';
import dynamic from 'next/dynamic';

import Separator from '@/components/others/separator';
import useMounted from '@/utils/mounted';
import useAuthenticated from '@/utils/isAuthenticated';
import Props from '@/utils/defaultProps';

import Footer from '../footer';
import Header from '../header';
import { SidenavContainerProps } from '../sidenavContainer';

const SidenavContainer: ComponentType<SidenavContainerProps> = dynamic(
  () => import('../sidenavContainer'),
  {
    ssr: false,
  },
);

const UserLayout = ({ children }: Props) => {
  const isMounted = useMounted();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthenticated();

  return (
    <Fragment>
      {isAuthenticated && isMounted && (
        <Fragment>
          <SidenavContainer isOpen={isOpen} setIsOpen={setIsOpen} />
          <div
            className={
              isOpen ? 'fixed z-20 w-screen h-screen bg-black opacity-50' : ''
            }
          />
          <div className={isOpen ? 'fixed overflow-y-hidden w-full' : ''}>
            <Header />
            {children}
            <Separator desktop={true} />
            <Footer />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserLayout;
