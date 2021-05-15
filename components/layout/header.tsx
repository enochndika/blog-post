import { useRouter } from 'next/router';
import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';

import ThemeChanger from '@/helpers/themeProvider';
import Language from '@/components/others/language';
import HeaderSearch from '@/helpers/headerSearch';
import { logout, useFetchUserProfile } from '@/actions/userActions';
import Navbar from '@/components/ui/navbar';
import { AngleDownIcon, PlusIcon, UserCircleIcon } from '@/components/ui/icons';
import Dropdown from '@/components/ui/dropdown';

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useFetchUserProfile();

  const redirectNotAuth = () => {
    router.push('/signin');
    setTimeout(
      () => cogoToast.info(t('Layout.header.item.post.notLoggedMessage')),
      100,
    );
  };

  return (
    <header className="container-fluid lg:px-container">
      <Navbar className="text-gray-700 dark:text-white mt-3 lg:mt-6 py-2 px-4 lg:mt-0 ">
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
                            className="h-10 w-10 rounded-full"
                            alt={user?.username}
                          />
                          <AngleDownIcon className="h-4 mt-3 pl-1" />
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
                        <span onClick={logout}>
                          {t('Layout.header.item.logout')}
                        </span>
                      </Dropdown.Item>
                      {user && user.role === 'king' && (
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
}
