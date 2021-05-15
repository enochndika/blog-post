import { useRouter } from 'next/router';
import { useEffect } from 'react';

import TopNavigation from './topNavigation';
import SideNavigation from './sideNavigation';
import style from './index.module.css';

import { getCookieFromBrowser } from '@/utils/cookies';
import Props from '@/utils/defaultProps';
import { useFetchUserProfile } from '@/actions/userActions';

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const { user } = useFetchUserProfile();
  const token = getCookieFromBrowser('blog-jwt-token');

  useEffect(() => {
    if (!token || (user && user.role !== 'king')) {
      router.push('/');
    }
  }, [user, token]);

  return (
    <>
      {user && user.role === 'king' && (
        <>
          <TopNavigation />
          <div className={style.left}>
            <SideNavigation className={style.scrollBar} />
          </div>
          <div className={style.right}>
            <div className="pt-12">{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminLayout;
