import { TopNavigation } from "./topNavigation";
import { SideNavigation } from "./sideNavigation";
import { loggedUser } from "../../../auth/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookieFromBrowser } from "../../../auth/cookies";
import { useTheme } from "next-themes";
import { useMounted } from "../../../utils/mounted";
import style from "../../../styles/components/admin/global.module.css";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { user } = loggedUser();
  const token = getCookieFromBrowser("blog-jwt-token");
  const { theme } = useTheme();
  const isMounted = useMounted();

  useEffect(() => {
    if (!token || (user && user.role !== "king")) {
      router.push("/");
    }
  }, [user, token]);
  return (
    <>
      {user && user.role === "king" && (
        <div className="flexible-content">
          <TopNavigation />
          <SideNavigation />
          <main
            className={
              isMounted && theme === "light" ? style.content : style.contentDark
            }
          >
            {children}
          </main>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
