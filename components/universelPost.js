import { Fragment } from "react";
import { MDBRow, MDBCol, MDBIcon, MDBView } from "mdbreact";
import style from "../styles/components/recentPost.module.css";
import { formatDate } from "../utils/formats";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export const UniversalPosts = ({ posts, md, lg, center }) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Fragment>
      <MDBRow className="mt-2" center={center}>
        {posts &&
          posts.map((post) => (
            <MDBCol md={md} lg={lg} key={post.id}>
              <MDBRow>
                <MDBCol lg="3" md="3" className={style.col}>
                  <Link href={`/posts/${post.slug}`}>
                    <a>
                      <MDBView zoom waves hover>
                        <img
                          src={post.image}
                          className="d-block w-100"
                          alt="post"
                        />
                      </MDBView>
                    </a>
                  </Link>
                </MDBCol>
                <MDBCol lg="9" md="9" className="mb-5">
                  <h5 className="font-weight-bold ">
                    <strong>{post.title}</strong>
                  </h5>
                  <p className={style.description}>
                    {post.description.slice(0, 130)}...
                  </p>
                  <div className={style.author}>
                    <div>
                      <span className="font-weight-bolder mr-1">
                        {post.user?.fullName}
                      </span>
                      <span className="grey-text mr-1">
                        {t("Components.default.category")}
                      </span>
                      <span>{post.posts_category.name}</span>
                    </div>
                    <div className="grey-text">
                      <span className="mr-1">
                        {router?.locale === "fr"
                          ? formatDate(post.createdAt, "fr-FR")
                          : formatDate(post.createdAt, "en-US")}
                      </span>
                      <span>&#9632;</span>
                      <span className="ml-2">
                        {post.read_time} {t("Components.default.estimatedRead")}{" "}
                        <MDBIcon icon="star" />
                      </span>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          ))}
      </MDBRow>
    </Fragment>
  );
};
