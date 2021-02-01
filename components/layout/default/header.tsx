import { ThemeChanger } from "../../../helpers/themeProvider";
import Link from "next/link";
import { loggedUser } from "../../../auth/useUser";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import { useTranslation } from "react-i18next";
import { Language } from "../../../helpers/changeLanguage";
import Navbar from "../../ui/navbar";
import { AngleDownIcon, PlusIcon, UserCircleIcon } from "../../ui/icons";
import Dropdown from "../../ui/dropdown";
import { HeaderSearch } from "../../../helpers/headerSearch";
import { logout } from "../../../actions/userActions";

export const Header = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = loggedUser();

  const redirectNotAuth = () => {
    router.push("/signin");
    setTimeout(
      () => cogoToast.info(t("Layout.header.item.post.notLoggedMessage")),
      100
    );
  };
  return (
    <header className="container-fluid lg:px-container">
      <Navbar className="text-gray-700 dark:text-white mt-3 lg:mt-6 py-2 px-4 lg:mt-0 ">
        <Navbar.Brand>
          <Link href="/">
            <a>Enoch Ndika</a>
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Nav>
            <Navbar.Item>
              <Navbar.Link>
                <ThemeChanger
                  darkTheme={t("Layout.header.item.theme.dark")}
                  lightTheme={t("Layout.header.item.theme.light")}
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
                    <div className="flex" onClick={redirectNotAuth}>
                      <PlusIcon size={18} space={2} className="mr-1" />
                      {t("Layout.header.item.post.index")}
                    </div>
                  </Navbar.Link>
                </Navbar.Item>
                <Navbar.Item>
                  <Dropdown>
                    <Dropdown.Toggle className="flex">
                      <UserCircleIcon className="h-6" />
                      <AngleDownIcon size={20} className="pl-1" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link href="/signin">
                          <a>{t("Layout.header.item.login")}</a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link href="/register">
                          <a>{t("Layout.header.item.register")}</a>
                        </Link>
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
                      router.push("/posts/create");
                    }}
                  >
                    <PlusIcon size={20} className="mr-2" />
                    {t("Layout.header.item.post.index")}
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
                      <Dropdown.Item>
                        <Link href={`/${user.username}/profile`}>
                          <a>@{user.username}</a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link href={`/${user?.username}/posts`}>
                          <a>{t("Layout.header.item.dropdown.posts")}</a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link href={`/${user?.username}/posts/liked`}>
                          <a>{t("Layout.header.item.dropdown.likes")}</a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link href="/">
                          <a onClick={logout}>
                            {t("Layout.header.item.logout")}
                          </a>
                        </Link>
                      </Dropdown.Item>
                      {user && user.role === "king" && (
                        <Dropdown.Item>
                          <Link href="/admin/users">
                            <a>Dashboard</a>
                          </Link>
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Navbar.Link>
              </>
            )}
            <Navbar.Item>
              <Navbar.Link>
                <HeaderSearch placeholder={t("Layout.header.item.search")} />
              </Navbar.Link>
            </Navbar.Item>
          </Navbar.Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
