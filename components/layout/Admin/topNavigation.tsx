import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import Navbar from '@/components/ui/navbar';
import ThemeChanger from '@/helpers/themeProvider';
import { HomeIcon, PowerOffIcon } from '@/components/ui/icons';
import { logout } from '@/actions/userActions';

const ActiveRoute = ({ router, path, content }) => (
  <>{router.asPath === path && <span>{content}</span>}</>
);

const data = [
  { content: 'Utilisateurs', path: '/admin/users' },
  { content: 'Posts', path: '/admin/posts' },
  { content: 'Commentaires', path: '/admin/comments' },
  { content: 'Commentaires enfants', path: '/admin/subcomments' },
  { content: 'Likes', path: '/admin/likes' },
  { content: 'Signalement des commentaires', path: '/admin/report/comments' },
  { content: 'Signalement des posts', path: '/admin/report/posts' },
  { content: 'Post Categories', path: '/admin/categories' },
  {
    content: 'Signalement des commentaires enfants',
    path: '/admin/report/subcomments',
  },
];

export default function TopNavigation() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="container-fluid fixed top-0 w-full z-20 text-white bg-black">
      <Navbar className="py-4 px-4">
        <div className="text-2xl font-medium ml-8">
          {data.map((item) => (
            <ActiveRoute
              content={item.content}
              router={router}
              path={item.path}
              key={item.path}
            />
          ))}
        </div>
        <Navbar.Nav>
          <Navbar.Item>
            <div className="h-8 w-8 rounded-full bg-gray-700 px-2 py-2 ">
              <Link href="/">
                <a>
                  <HomeIcon className="w-full h-full text-white" />
                </a>
              </Link>
            </div>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link>
              <div className="h-8 w-8 rounded-full bg-gray-700 px-2 py-2 ">
                <ThemeChanger
                  darkTheme={t('Layout.header.item.theme.dark')}
                  lightTheme={t('Layout.header.item.theme.light')}
                  notText={true}
                  iconClass="h-full w-full"
                />
              </div>
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <div
              className="h-8 w-8 rounded-full bg-gray-700 px-2 py-2 cursor-pointer"
              onClick={logout}
            >
              <PowerOffIcon className="w-full h-full text-white" />
            </div>
          </Navbar.Item>
        </Navbar.Nav>
      </Navbar>
    </div>
  );
}
