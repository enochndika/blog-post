import Link from "next/link";
import { MDBContainer, MDBFooter } from "mdbreact";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  const styles = {
    main: {
      backgroundColor: "#111111",
    },
  };
  return (
    <MDBFooter className="font-small pt-4 mt-4" style={styles.main}>
      <MDBContainer fluid>
        <div className="text-center" style={{ width: "60%", margin: "auto" }}>
          <p>{t("Layout.footer.p1")}</p>
          <p>
            {t("Layout.footer.p2")}
            <Link href="/contact">
              <a className="text-primary pl-1">{t("Layout.footer.p2Link")}</a>
            </Link>
          </p>
        </div>
      </MDBContainer>
      <div className="footer-copyright text-center py-3" style={styles.main}>
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:
          <span> ENOCH NDIKA </span>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};
