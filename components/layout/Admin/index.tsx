import { TopNavigation } from "./topNavigation";
import { SideNavigation } from "./sideNavigation";
import { loggedUser } from "../../../auth/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookieFromBrowser } from "../../../auth/cookies";
import style from "./index.module.css";
import Props from "../../../utils/defaultProps";

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const { user } = loggedUser();
  const token = getCookieFromBrowser("blog-jwt-token");

  useEffect(() => {
    if (!token || (user && user.role !== "king")) {
      router.push("/");
    }
  }, [user, token]);

  return (
    <>
      {user && user.role === "king" && (
        <>
          <TopNavigation />
          <div className={style.left}>
            <SideNavigation className={style.scrollBar} />
          </div>
          <div className={style.right}>
            <div className="pt-12">{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminLayout;
