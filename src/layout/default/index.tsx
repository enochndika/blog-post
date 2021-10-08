import Props from '@/utils/defaultProps';
import Header from '@/layout/_common/header';
import Footer from '@/layout/_common/footer';
import Overlay from '@/layout/_common/overlay';
import SidenavContainer from '@/layout/_common/sidenavContainer';
import LayoutProvider from '@/layout/_common/provider';

const DefaultLayout = ({ children }: Props) => {
  return (
    <LayoutProvider>
      <SidenavContainer />
      <Overlay />
      <Header />
      {children}
      <Footer />
    </LayoutProvider>
  );
};

export default DefaultLayout;
