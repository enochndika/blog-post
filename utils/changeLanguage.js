import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavItem,
} from "mdbreact";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import style from "../styles/components/default/topNavigation.module.css";

export const Language = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  return (
    <MDBNavItem className={style.navbarItem}>
      <MDBDropdown className="nav-link">
        <MDBDropdownToggle caret tag="div">
          <MDBIcon icon="language" size="lg" className="mr-1" />
          <span>{t("Layout.header.item.language.index")}</span>
        </MDBDropdownToggle>
        <MDBDropdownMenu basic color="dark">
          <MDBDropdownItem disabled={locale === "fr"}>
            <Link href={router.asPath} locale="fr">
              <a
                className={
                  locale === "fr"
                    ? "nav-link text-primary font-weight-bold"
                    : "nav-link"
                }
              >
                <ReactCountryFlag
                  className="emojiFlag mr-2"
                  countryCode="FR"
                  style={{
                    fontSize: "1.5em",
                  }}
                  aria-label="France"
                />
                {t("Layout.header.item.language.french")}
              </a>
            </Link>
          </MDBDropdownItem>
          <MDBDropdownItem disabled={locale === "en"}>
            <Link href={router.asPath} locale="en">
              <a
                className={
                  locale === "en"
                    ? "nav-link text-primary font-weight-bold"
                    : "nav-link"
                }
              >
                <ReactCountryFlag
                  className="emojiFlag mr-2"
                  countryCode="US"
                  style={{
                    fontSize: "1.5em",
                  }}
                  aria-label="United States"
                />
                {t("Layout.header.item.language.english")}
              </a>
            </Link>
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavItem>
  );
};
