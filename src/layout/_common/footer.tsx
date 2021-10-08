import Container from '@/components/ui/container';
import { FC } from 'react';

const Footer: FC = () => (
  <footer className="relative bottom-0 text-white text-sm bg-darker">
    <div className="py-4 text-center bg-black">
      <Container noPadding={true}>
        &copy; {new Date().getFullYear()} Copyright:
        <span> ENOCH NDIKA </span>
      </Container>
    </div>
  </footer>
);

export default Footer;
