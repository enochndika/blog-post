import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import cogoToast from 'cogo-toast';

import { logout, useFetchUserProfile } from '@/actions/userActions';
import HeaderSearch from '@/helpers/headerSearch';
import ThemeChanger from '@/helpers/themeProvider';
import Collapse from '../ui/collapse';
import { HomeIcon, LanguageIcon, PlusIcon, UserCircleIcon } from '../ui/icons';
import { Sidenav } from '../ui/sidenav';
import { FranceFlag, UsaFlag } from '../ui/flag';
import Toggler from '../ui/toggler';

export interface SidenavContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen?: boolean) => void;
}

export default function SidenavContainer({
  isOpen,
  setIsOpen,
}: SidenavContainerProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const { user } = useFetchUserProfile();

  const closeNav = () => {
    setIsOpen(!isOpen);
  };

  const pushNotAuth = () => {
    closeNav();
    setTimeout(
      () => cogoToast.info(t('Layout.header.item.post.notLoggedMessage')),
      100,
    );
  };

  const signOut = async () => {
    await logout();
    await closeNav();
  };

  return (
    <>
      <Toggler toggle={() => setIsOpen(true)} />
      <Sidenav isOpen={isOpen} setIsOpen={setIsOpen}>
        <Sidenav.Item>
          <Link href="/">
            <a className="flex">
              <HomeIcon size={20} className="mr-1" />
              Home
            </a>
          </Link>
        </Sidenav.Item>
        {!user && (
          <>
            <Sidenav.Item>
              <Link href="/signin">
                <a className="flex" onClick={pushNotAuth}>
                  <PlusIcon size={20} className="mr-1" />
                  {t('Layout.header.item.post.index')}
                </a>
              </Link>
            </Sidenav.Item>
            <Sidenav.Item>
              <Collapse icon={true}>
                <div className="flex">
                  <div>
                    <UserCircleIcon size={20} className="pr-1" />
                  </div>
                  <div>Profile</div>
                </div>
                <div>
                  <div className="pl-10 pt-2">
                    <Link href="/signin">
                      <a className="block pb-3" onClick={closeNav}>
                        {t('Layout.header.item.login')}
                      </a>
                    </Link>
                    <Link href="/register">
                      <a className="block" onClick={closeNav}>
                        {t('Layout.header.item.register')}
                      </a>
                    </Link>
                  </div>
                </div>
              </Collapse>
            </Sidenav.Item>
          </>
        )}
        <Sidenav.Item>
          <Collapse icon={true}>
            <div className="flex">
              <LanguageIcon size={22} className="pr-1" space={2} />
              <span>{t('Layout.header.item.language.index')}</span>
            </div>
            <div className="pl-8">
              <Link href={router.asPath} locale="fr">
                <a
                  className={
                    locale === 'fr'
                      ? 'text-blue-700 font-bold block py-3'
                      : 'block text-black dark:text-white block py-3'
                  }
                >
                  <FranceFlag />
                  {t('Layout.header.item.language.french')}
                </a>
              </Link>
              <Link href={router.asPath} locale="en">
                <a
                  className={
                    locale === 'en'
                      ? 'text-blue-700 font-bold block'
                      : 'block text-black dark:text-white block'
                  }
                >
                  <UsaFlag />
                  {t('Layout.header.item.language.english')}
                </a>
              </Link>
            </div>
          </Collapse>
        </Sidenav.Item>
        <Sidenav.Item>
          <div className="-mt-2">
            <ThemeChanger
              darkTheme={t('Layout.header.item.theme.dark')}
              lightTheme={t('Layout.header.item.theme.light')}
              iconClass="h-4 mt-1 mr-1"
            />
          </div>
        </Sidenav.Item>
        {user && (
          <>
            <Sidenav.Item>
              <Link href="/posts/create">
                <a className="flex">
                  <PlusIcon size={20} className="mr-1" />
                  {t('Layout.header.item.post.index')}
                </a>
              </Link>
            </Sidenav.Item>
            <Sidenav.Item>
              <Collapse icon={true}>
                <div className="flex">
                  {user.avatar ? (
                    <>
                      <img
                        src={user.avatar}
                        className="h-10 w-10 rounded-full"
                        alt={user?.username}
                      />
                      <div className="ml-2 ">{user.username}</div>
                    </>
                  ) : (
                    <UserCircleIcon className="h-6" />
                  )}
                </div>
                <div>
                  <div className="pl-10 pt-2 pb-3">
                    <Link href={`/${user.username}/profile`}>
                      <a className="nav-link" onClick={closeNav}>
                        Profile
                      </a>
                    </Link>
                  </div>
                  <div className="pl-10 pb-3">
                    <Link href={`/${user?.username}/posts`}>
                      <a className="nav-link" onClick={closeNav}>
                        {t('Layout.header.item.dropdown.posts')}
                      </a>
                    </Link>
                  </div>
                  <div className="pl-10 pb-2">
                    <Link href={`/${user?.username}/posts/liked`}>
                      <a className="nav-link" onClick={closeNav}>
                        {t('Layout.header.item.dropdown.likes')}
                      </a>
                    </Link>
                  </div>
                  {user && user.role === 'king' && (
                    <div className="pl-10 pt-1 pb-3">
                      <Link href="/admin/users">
                        <a className="nav-link" onClick={closeNav}>
                          Dashboard
                        </a>
                      </Link>
                    </div>
                  )}
                  <div className="pl-10 pb-2">
                    <Link href="/">
                      <a onClick={signOut} className="nav-link">
                        {t('Layout.header.item.logout')}
                      </a>
                    </Link>
                  </div>
                </div>
              </Collapse>
            </Sidenav.Item>
          </>
        )}
        <Sidenav.Item>
          <HeaderSearch
            placeholder={t('Layout.header.item.search')}
            close={closeNav}
          />
        </Sidenav.Item>
      </Sidenav>
    </>
  );
}
