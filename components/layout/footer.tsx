import Container from '../ui/container';
import { FC } from 'react';

export const Footer: FC = () => (
  <footer className="bg-darker text-white relative bottom-0 text-sm">
    <div className="bg-black text-center py-4">
      <Container noPadding={true}>
        &copy; {new Date().getFullYear()} Copyright:
        <span> ENOCH NDIKA </span>
      </Container>
    </div>
  </footer>
);
