import { MDBIcon, MDBNavbarNav, MDBNavItem } from "mdbreact";
import Link from "next/link";
import style from "../../../styles/components/admin/global.module.css";
export const SideNavigation = () => {
  return (
    <div className={`${style.sidebar} position-fixed`}>
      <Link href="/">
        <a className={`${style.logoWrapper} waves-effect`}>
          <img
            alt="MDB React Logo"
            className={style.sidenavImg}
            src="/vercel.png"
          />
        </a>
      </Link>
      <div className={style.sidenavListContainer}>
        <MDBNavbarNav>
          <MDBNavItem>
            <Link href="/admin/users">
              <a className="nav-link">
                <MDBIcon icon="users" className="mr-2" />
                <strong>Utilisateurs</strong>
              </a>
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link href="/admin/posts">
              <a className="nav-link">
                <MDBIcon icon="blog" className="mr-2" />
                <strong>Posts</strong>
              </a>
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link href="/admin/likes">
              <a className="nav-link">
                <MDBIcon icon="heart" className="mr-2" />
                <strong>Likes</strong>
              </a>
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link href="/admin/comments">
              <a className="nav-link">
                <MDBIcon icon="comments" className="mr-2" />
                <strong>Commentaires</strong>
              </a>
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link href="/admin/categories">
              <a className="nav-link">
                <MDBIcon icon="list-alt" className="mr-2" />
                <strong>Post Categories</strong>
              </a>
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link href="/admin/subcomments">
              <a className="nav-link">
                <MDBIcon icon="comment-dots" className="mr-2" />
                <strong>Commentaires Enfants</strong>
              </a>
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link href="/admin/report/posts">
              <a className="nav-link">
                <MDBIcon icon="flag" className="mr-2" />
                <strong>Report Posts</strong>
              </a>
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link href="/admin/report/comments">
              <a className="nav-link">
                <MDBIcon icon="flag" className="mr-2" />
                <strong>Report Comments</strong>
              </a>
            </Link>
          </MDBNavItem>
        </MDBNavbarNav>
      </div>
    </div>
  );
};
