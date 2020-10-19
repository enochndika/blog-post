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
import { logout } from "../../../utils/actions/userActions";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import { HeaderSearch } from "../../../helpers/headerSearch";

export const DefaultTopNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const isMounted = useMounted();
  const { user } = loggedUser();
  const router = useRouter();

  return (
    <MDBContainer fluid className={style.container}>
      <MDBNavbar expand="md" className={style.navbar}>
        <Link href="/">
          <a className={style.navbarBrand}>Enoch Ndika</a>
        </Link>
        {isMounted && (
          <MDBHamburgerToggler
            onClick={() => setIsOpen(!isOpen)}
            id="navbarCollapse3"
            color={theme === "dark" ? "white" : "black"}
            className="d-md-none d-lg-none d-xl-none"
          />
        )}
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem className={style.navbarItem}>
              <ThemeChanger />
            </MDBNavItem>
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
                          cogoToast.info("you must login before adding a post"),
                        100
                      );
                    }}
                  >
                    <MDBIcon icon="plus" className="mr-2 dark-grey-text" />
                    Add a post
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
                          <a>Login</a>
                        </Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link href="/register">
                          <a>Register</a>
                        </Link>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                <MDBNavItem className={style.navbarItem}>
                  <HeaderSearch />
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
                    Add a post
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
                          <a>posts</a>
                        </Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link href={`/${user?.username}/posts/liked`}>
                          <a>likes</a>
                        </Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link href="/">
                          <a onClick={logout}>Log out</a>
                        </Link>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                <MDBNavItem className={style.navbarItem}>
                  <HeaderSearch />
                </MDBNavItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </MDBContainer>
  );
};
