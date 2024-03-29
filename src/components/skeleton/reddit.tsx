import { useTheme } from 'next-themes';
import ContentLoader from 'react-content-loader';

import Row from '../ui/row';
import Container from '../ui/container';
import useMounted from '@/utils/mounted';

const RedditSkeleton = () => {
  const isMounted = useMounted();
  return (
    <>
      {isMounted && (
        <Container style={{ marginTop: '10%' }}>
          <Row>
            <div className="col-6">
              <FadingLoaderCard1 />
              <FadingLoaderCard1 />
              <FadingLoaderCard1 />
              <FadingLoaderCard1 />
            </div>
            <div className="col-6">
              <FadingLoaderCard2 />
              <FadingLoaderCard2 />
              <FadingLoaderCard2 />
              <FadingLoaderCard2 />
            </div>
          </Row>
        </Container>
      )}
    </>
  );
};

function FadingLoaderCard1() {
  const isMounted = useMounted();
  const { theme } = useTheme();
  return (
    <ContentLoader
      width="100%"
      height={100}
      backgroundColor={isMounted && theme === 'light' ? '#eeeeee' : '#424242'}
      foregroundColor="#fafafa"
    >
      <rect x="70" y="15" rx="5" ry="5" width="300" height="15" />
      <rect x="70" y="39" rx="5" ry="5" width="220" height="9" />
      <rect x="20" y="10" rx="0" ry="0" width="40" height="40" />
    </ContentLoader>
  );
}

function FadingLoaderCard2() {
  const isMounted = useMounted();
  const { theme } = useTheme();
  return (
    <ContentLoader
      width="100%"
      height={100}
      backgroundColor={isMounted && theme === 'light' ? '#eeeeee' : '#424242'}
      foregroundColor="#fafafa"
    >
      <rect x="70" y="15" rx="5" ry="5" width="300" height="15" />
      <rect x="70" y="39" rx="5" ry="5" width="220" height="9" />
      <rect x="20" y="10" rx="0" ry="0" width="40" height="40" />
    </ContentLoader>
  );
}

export default RedditSkeleton;
