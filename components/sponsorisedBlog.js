import { MDBCol, MDBContainer, MDBIcon, MDBRow, MDBView } from "mdbreact";
import style from "../styles/components/sponsorisedBlog.module.css";
import { formatDate } from "../utils/formats";
import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export const SponsorisedBlog = ({ posts }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const isMounted = useMounted();
  const { t } = useTranslation();
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol lg="6" className="m-0 p-0">
          <div className={style.col}>
            <Link href={`/posts/${posts.slug}`}>
              <a>
                <MDBView zoom waves hover>
                  <img src={posts.image} className={style.img} alt="post" />
                </MDBView>
              </a>
            </Link>
          </div>
        </MDBCol>

        <MDBCol
          lg="6"
          className={
            isMounted && theme === "light" ? style.col : style.colTheme
          }
        >
          <div className={style.textCol}>
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>{posts.title}</strong>
            </h3>
            <p className={style.description}>{posts?.description}</p>
            <div className={style.author}>
              <div>
                <span className="font-weight-bolder mr-1">
                  {posts.user?.fullName}
                </span>
                <span className="grey-text mr-1">
                  {t("Components.default.category")}
                </span>
                <span>{posts.posts_category.name}</span>
              </div>
              <div className="grey-text">
                <span className="mr-1">
                  {router?.locale === "fr"
                    ? formatDate(posts.createdAt, "fr-FR")
                    : formatDate(posts.createdAt, "en-US")}
                </span>
                <span>&#9632;</span>
                <span className="ml-2">
                  {posts.read_time} {t("Components.default.estimatedRead")}{" "}
                  <MDBIcon icon="star" />
                </span>
              </div>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
