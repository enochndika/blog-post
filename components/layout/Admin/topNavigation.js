import { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem,
} from "mdbreact";
import { useRouter } from "next/router";
import { ThemeChanger } from "../../../utils/themeProvider";
import style from "../../../styles/components/admin/global.module.css";

const ActiveRoute = ({ router, path, content }) => (
  <>{router.pathname === path && <span>{content}</span>}</>
);
export const TopNavigation = () => {
  const [collapse, setCollapse] = useState(false);
  const router = useRouter();

  return (
    <MDBNavbar className="flexible-navbar" expand="md" fixed="top">
      <MDBNavbarBrand className={style.navbarBrand}>
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
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={() => setCollapse(!collapse)} />
      <MDBCollapse isOpen={collapse} navbar />
      <MDBNavbarNav right>
        <MDBNavItem>
          <ThemeChanger />
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBNavbar>
  );
};
