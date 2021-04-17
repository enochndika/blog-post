import { FC } from 'react';
import ContentLoader from 'react-content-loader';
import { useMounted } from '../../utils/mounted';

const ProfileShow: FC = (props) => {
  const isMounted = useMounted();
  return (
    <>
      {isMounted && (
        <div style={{ width: '70%', marginTop: '10%', left: '10%' }}>
          <ContentLoader
            speed={2}
            width="100%"
            height={200}
            viewBox="0 0 300 170"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
          >
            <circle cx="248" cy="59" r="49" />
            <circle cx="263" cy="66" r="8" />
            <rect x="175" y="120" rx="0" ry="0" width="156" height="8" />
            <rect x="204" y="137" rx="0" ry="0" width="100" height="8" />
            <rect x="248" y="128" rx="0" ry="0" width="0" height="1" />
            <rect x="247" y="126" rx="0" ry="0" width="1" height="8" />
            <rect x="252" y="166" rx="0" ry="0" width="1" height="0" />
          </ContentLoader>
        </div>
      )}
    </>
  );
};

export default ProfileShow;
