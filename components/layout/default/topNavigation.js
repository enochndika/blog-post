import { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBCollapse,
  MDBIcon,
  MDBContainer,
  MDBHamburgerToggler,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import style from "../../../styles/components/default/topNavigation.module.css";
import { useTheme } from "next-themes";
import { useMounted } from "../../../utils/mounted";
import { ThemeChanger } from "../../../utils/themeProvider";
import Link from "next/link";
import { loggedUser } from "../../../auth/useUser";
import { logout } from "../../../actions/userActions";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import { HeaderSearch } from "../../../helpers/headerSearch";
import { useTranslation } from "react-i18next";
import { Language } from "../../../utils/changeLanguage";

export const DefaultTopNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isMounted = useMounted();
  const { user } = loggedUser();

  return (
    <MDBContainer fluid className={style.container}>
      <MDBNavbar expand="lg" className={style.navbar}>
        <Link href="/">
          <a className={style.navbarBrand}>Enoch Ndika</a>
        </Link>
        {isMounted && (
          <MDBHamburgerToggler
            onClick={() => setIsOpen(!isOpen)}
            id="navbarCollapse3"
            color={theme === "dark" ? "white" : "black"}
            className="d-lg-none d-xl-none"
          />
        )}
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem className={style.navbarItem}>
              <ThemeChanger
                darkTheme={t("Layout.header.item.theme.dark")}
                lightTheme={t("Layout.header.item.theme.light")}
              />
            </MDBNavItem>
            <Language />
            {user && user.role === "king" && (
              <MDBNavItem className={style.navbarItem}>
                <Link href="/admin/users">
                  <a className="nav-link">
                    <MDBIcon icon="tachometer-alt" className="mr-1 grey-text" />
                    Admin
                  </a>
                </Link>
              </MDBNavItem>
            )}
            {!user && (
              <>
                <MDBNavItem className={style.navbarItem}>
                  <div
                    className="nav-link"
                    onClick={() => {
                      router.push("/signin");
                      setTimeout(
                        () =>
                          cogoToast.info(
                            t("Layout.header.item.post.notLoggedMessage")
                          ),
                        100
                      );
                    }}
                  >
                    <MDBIcon icon="plus" className="mr-2 dark-grey-text" />
                    {t("Layout.header.item.post.index")}
                  </div>
                </MDBNavItem>
                <MDBNavItem className={style.navbarItem}>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <span className="mr-2">
                        <MDBIcon
                          icon="user-circle"
                          size="lg"
                          className="dark-grey-text"
                        />
                      </span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem>
                        <Link href="/signin">
                          <a>{t("Layout.header.item.login")}</a>
                        </Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link href="/register">
                          <a>{t("Layout.header.item.register")}</a>
                        </Link>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </>
            )}
            {user && (
              <>
                <MDBNavItem className={style.navbarItem}>
                  <div
                    className="nav-link"
                    onClick={() => {
                      router.push("/posts/create");
                    }}
                  >
                    <MDBIcon icon="plus" className="mr-2" />
                    {t("Layout.header.item.post.index")}
                  </div>
                </MDBNavItem>
                <MDBNavItem className={style.navbarItem}>
                  <MDBDropdown className={style.dropdown}>
                    <MDBDropdownToggle nav caret>
                      {user.avatar ? (
                        <img src={user.avatar} className={`${style.img}`} />
                      ) : (
                        <MDBIcon
                          icon="user-circle"
                          size="lg"
                          className="pt-2 dark-grey-text"
                        />
                      )}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem>
                        <Link href={`/${user.username}/profile`}>
                          <a>@{user.username}</a>
                        </Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link href={`/${user?.username}/posts`}>
                          <a>{t("Layout.header.item.dropdown.posts")}</a>
                        </Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link href={`/${user?.username}/posts/liked`}>
                          <a>{t("Layout.header.item.dropdown.likes")}</a>
                        </Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link href="/">
                          <a onClick={logout}>
                            {" "}
                            {t("Layout.header.item.logout")}
                          </a>
                        </Link>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </>
            )}
            <MDBNavItem className={style.navbarItem}>
              <HeaderSearch placeholder={t("Layout.header.item.search")} />
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </MDBContainer>
  );
};
