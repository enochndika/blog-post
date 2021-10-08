import dynamic from 'next/dynamic';

import Footer from '../_common/footer';
import Header from '../_common/header';
import Props from '@/utils/defaultProps';
import useMounted from '@/utils/mounted';
import Overlay from '@/layout/_common/overlay';
import Separator from '@/components/others/separator';
import LayoutProvider from '@/layout/_common/provider';
import useAuthenticated from '@/config/isAuthenticated';

const SidenavContainer = dynamic(() => import('../_common/sidenavContainer'), {
  ssr: false,
});

const UserLayout = ({ children }: Props) => {
  const isMounted = useMounted();
  const { isAuthenticated } = useAuthenticated();

  return (
    <LayoutProvider>
      {isAuthenticated && isMounted && (
        <>
          <SidenavContainer />
          <Overlay />
          <Header />
          {children}
          <Separator desktop={true} />
          <Footer />
        </>
      )}
    </LayoutProvider>
  );
};

export default UserLayout;
