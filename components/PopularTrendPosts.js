import { MDBRow, MDBIcon } from "mdbreact";
import style from "../styles/components/popularTrendPosts.module.css";
import { formatDate } from "../utils/formats";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export const PopularTrendPosts = ({ post, number }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div>
      <MDBRow className="mt-2">
        <div className="col-2 col-xs-2 col-md-2 col-lg-3 pb-3">
          <h2 className={`h1-responsive ${style.number}`}>{number}</h2>
        </div>
        <div className="col-10 col-xs-10 col-md-10 col-lg-9 m-0 p-0 mb-4">
          <Link href={`/posts/${post.slug}`} passHref>
            <div className={style.title}>{post.title}</div>
          </Link>
          <div className={style.author}>
            <div>
              <span className="font-weight-bolder mr-1">
                {post.user?.fullName}
              </span>
              <span className="grey-text mr-1">
                {t("Components.default.category")}
              </span>
              <span>{post.posts_category?.name}</span>
            </div>
            <div className="grey-text">
              <span className="mr-1">
                {router?.locale === "fr"
                  ? formatDate(post.createdAt, "fr-FR")
                  : formatDate(post.createdAt, "en-US")}
              </span>
              <span>&#9632;</span>
              <span className="ml-2">
                {post.read_time} {t("Components.default.estimatedRead")}
                <MDBIcon icon="star" />
              </span>
            </div>
          </div>
        </div>
      </MDBRow>
    </div>
  );
};
