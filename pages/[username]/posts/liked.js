import { MDBCol, MDBContainer, MDBIcon, MDBRow, MDBView } from "mdbreact";
import { loggedUser } from "../../../auth/useUser";
import DefaultLayout from "../../../components/layout/default";
import style from "../../../styles/main/username/liked.module.css";
import Link from "next/link";
import { formatDate } from "../../../utils/formats";
import { fetchTotalPostLikedByUser } from "../../../utils/actions/postActions";
import Head from "next/head";

export default function LikedPosts() {
  const { user } = loggedUser();
  const { likes } = fetchTotalPostLikedByUser(user?.id);
  return (
    <>
      <Head>
        <title>Posts liked</title>
      </Head>
      <MDBContainer fluid className={style.container}>
        {likes === null || likes?.length <= 0 ? (
          <div className="text-center font-weight-bold dark-grey-text mb-5 mt-5">
            You don't have liked posts
          </div>
        ) : (
          <div className="h3-responsive text-center font-weight-bold dark-grey-text mb-5 mt-5">
            Posts liked
          </div>
        )}
        <MDBRow className="mt-3">
          {likes &&
            likes.map((like) => (
              <MDBCol md="6" lg="6" key={like.id}>
                <MDBRow>
                  <MDBCol lg="5" md="5" className={style.col}>
                    <Link href={`/posts/${like.post?.slug}`}>
                      <a>
                        <MDBView zoom waves hover>
                          <img
                            src={like.post?.image}
                            className="d-block w-100"
                            alt="post"
                          />
                        </MDBView>
                      </a>
                    </Link>
                  </MDBCol>
                  <MDBCol lg="7" md="7" className="mb-5">
                    <h5 className="font-weight-bold ">
                      <strong>{like.post?.title}</strong>
                    </h5>
                    <p className={style.description}>
                      {like.post?.description.slice(0, 130)}...
                    </p>
                    <div className={style.author}>
                      <div>
                        <span className="font-weight-bolder mr-1">
                          {like.post?.user?.fullName}
                        </span>
                        <span className="grey-text mr-1">in</span>
                        <span>{like.post?.posts_category.name}</span>
                      </div>
                      <div className="grey-text">
                        <span className="mr-1">
                          {formatDate(like.post?.createdAt)}
                        </span>
                        <span>&#9632;</span>
                        <span className="ml-2">
                          {like.post?.read_time} min read{" "}
                          <MDBIcon icon="star" />
                        </span>
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>
    </>
  );
}

LikedPosts.Layout = DefaultLayout;
