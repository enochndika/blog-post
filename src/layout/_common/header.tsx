import cogoToast from 'cogo-toast';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Navbar from '@/components/ui/navbar';
import { logout } from '@/actions/authActions';
import Dropdown from '@/components/ui/dropdown';
import Language from '@/components/others/language';
import PlusIcon from '@/components/icons/others/plus';
import HeaderSearch from '@/modules/others/headerSearch';
import ThemeChanger from '@/modules/others/themeProvider';
import { useFetchUserProfile } from '@/actions/userActions';
import UserCircleIcon from '@/components/icons/human/userCircle';
import AngleDownIcon from '@/components/icons/direction/angleDown';

const Header = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, mutate } = useFetchUserProfile();

  const onLogOut = async () => {
    await logout();
    await mutate();
    await router.push('/');
  };

  const redirectNotAuth = () => {
    router.push('/signin');
    setTimeout(
      () => cogoToast.info(t('Layout.header.item.post.notLoggedMessage')),
      100,
    );
  };

  return (
    <header className="container-fluid mt-3 lg:mt-6 lg:px-container">
      <Navbar className="px-4 py-2 text-gray-700 dark:text-white">
        <Navbar.Brand href="/">Enoch Ndika</Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Nav>
            <Navbar.Item>
              <Navbar.Link>
                <ThemeChanger
                  darkTheme={t('Layout.header.item.theme.dark')}
                  lightTheme={t('Layout.header.item.theme.light')}
                  iconClass="h-4 mr-1 mt-1"
                />
              </Navbar.Link>
            </Navbar.Item>
            <Navbar.Item>
              <Language />
            </Navbar.Item>
            {!user && (
              <>
                <Navbar.Item>
                  <Navbar.Link>
                    <button className="flex" onClick={redirectNotAuth}>
                      <PlusIcon size={18} space={2} className="mr-1" />
                      {t('Layout.header.item.post.index')}
                    </button>
                  </Navbar.Link>
                </Navbar.Item>
                <Navbar.Item>
                  <Dropdown>
                    <Dropdown.Toggle className="flex">
                      <UserCircleIcon className="h-6" />
                      <AngleDownIcon size={20} className="pl-1" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/signin">
                        {t('Layout.header.item.login')}
                      </Dropdown.Item>
                      <Dropdown.Item href="/register">
                        {t('Layout.header.item.register')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Navbar.Item>
              </>
            )}
            {user && (
              <>
                <Navbar.Link>
                  <span
                    className="flex"
                    onClick={() => {
                      router.push('/posts/create');
                    }}
                  >
                    <PlusIcon size={20} className="mr-2" />
                    {t('Layout.header.item.post.index')}
                  </span>
                </Navbar.Link>
                <Navbar.Link>
                  <Dropdown>
                    <Dropdown.Toggle className="flex">
                      {user.avatar ? (
                        <>
                          <img
                            src={user.avatar}
                            className="w-10 h-10 rounded-full"
                            alt={user?.username}
                          />
                          <AngleDownIcon className="mt-3 pl-1 h-4" />
                        </>
                      ) : (
                        <>
                          <UserCircleIcon className="h-6" />
                          <AngleDownIcon size={20} className="pl-1" />
                        </>
                      )}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href={`/${user.username}/profile`}>
                        @{user.username}
                      </Dropdown.Item>
                      <Dropdown.Item href={`/${user?.username}/posts`}>
                        {t('Layout.header.item.dropdown.posts')}
                      </Dropdown.Item>
                      <Dropdown.Item href={`/${user?.username}/posts/liked`}>
                        {t('Layout.header.item.dropdown.likes')}
                      </Dropdown.Item>
                      <Dropdown.Item href="/">
                        <span onClick={onLogOut}>
                          {t('Layout.header.item.logout')}
                        </span>
                      </Dropdown.Item>
                      {user && user.role === 'admin' && (
                        <Dropdown.Item href="/admin/users">
                          Dashboard
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Navbar.Link>
              </>
            )}
            <Navbar.Item>
              <Navbar.Link>
                <HeaderSearch placeholder={t('Layout.header.item.search')} />
              </Navbar.Link>
            </Navbar.Item>
          </Navbar.Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
