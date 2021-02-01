import { useRouter } from "next/router";
import Navbar from "../../ui/navbar";
import { ThemeChanger } from "../../../helpers/themeProvider";
import { useTranslation } from "react-i18next";
import { HomeIcon, PowerOffIcon } from "../../ui/icons";
import Link from "next/link";
import { logout } from "../../../actions/userActions";
import { FC } from "react";

const ActiveRoute = ({ router, path, content }) => (
  <>{router.asPath === path && <span>{content}</span>}</>
);

export const TopNavigation: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="container-fluid fixed top-0 w-full z-20 text-white bg-black">
      <Navbar className="py-4 px-4">
        <div className="text-2xl font-medium ml-8">
          <ActiveRoute
            content="Utilisateurs"
            router={router}
            path="/admin/users"
          />
          <ActiveRoute content="Posts" router={router} path="/admin/posts" />
          <ActiveRoute
            content="Commentaires"
            router={router}
            path="/admin/comments"
          />
          <ActiveRoute
            content="Commentaires enfants"
            router={router}
            path="/admin/subcomments"
          />
          <ActiveRoute content="Likes" router={router} path="/admin/likes" />
          <ActiveRoute
            content="Signalement des commentaires"
            router={router}
            path="/admin/report/comments"
          />
          <ActiveRoute
            content="Signalement des commentaires enfants"
            router={router}
            path="/admin/report/subcomments"
          />
          <ActiveRoute
            content="Signalement des posts"
            router={router}
            path="/admin/report/posts"
          />
          <ActiveRoute
            content="Post Categories"
            router={router}
            path="/admin/categories"
          />
          <ActiveRoute
            content="Static Pages"
            router={router}
            path="/admin/static-pages"
          />
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
                  darkTheme={t("Layout.header.item.theme.dark")}
                  lightTheme={t("Layout.header.item.theme.light")}
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
};
