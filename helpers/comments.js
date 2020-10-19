import {
  MDBBtn,
  MDBCol,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBRow,
} from "mdbreact";
import style from "../styles/components/postComment.module.css";
import Moment from "react-moment";
import { useSWRInfinite } from "swr";
import api from "../utils/axios";
import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";
import { deleteComment } from "../utils/actions/commentActions";
import { AddComment } from "./addComment";
import { ChildComments } from "./childComments";
import { useState } from "react";
import { UpdateComment } from "./updateComment";
import { loggedUser } from "../auth/useUser";
import { ReportModal } from "./reportModal";
import cogoToast from "cogo-toast";

const fetcher = (url) => api.get(url).then((res) => res.data.data);
const LIMIT = 6;

export const PostComments = ({ post }) => {
  const [openUpdateComment, setOpenUpdateComment] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [selectedCommentRow, setSelectedCommentRow] = useState(undefined);
  const [commentId, setCommentId] = useState(null);

  const { theme } = useTheme();
  const isMounted = useMounted();
  const { user } = loggedUser();
  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (index) => `/comments/${post}?page=${index + 1}&limit=${LIMIT}`,
    fetcher
  );

  const onSelectedCommentRow = (index) => {
    if (user) {
      setSelectedCommentRow(index);
      setOpenUpdateComment(true);
    }
  };

  const onSelectedComment = (id) => {
    if (!user) {
      cogoToast.info("You must login before reporting a comment");
    }
    if (user) {
      setCommentId(id);
      setReportModal(!reportModal);
    }
  };

  const toggleReportModal = () => {
    setReportModal(!reportModal);
  };

  const comments = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  return (
    <div className="mt-5 ml-1">
      <AddComment post={post} mutate={mutate} />
      {comments && comments.length > 0 && (
        <div className="h5-responsive mb-4 font-weight-bold">
          <span onClick={() => setShowComments(!showComments)}>
            Show comments
            {showComments ? (
              <MDBIcon icon="angle-down" />
            ) : (
              <MDBIcon icon="angle-up" />
            )}
          </span>
        </div>
      )}
      {showComments && (
        <>
          <ReportModal
            isOpen={reportModal}
            toggle={toggleReportModal}
            userId={user?.id}
            id={commentId}
            comment
          />
          <MDBRow className={style.row}>
            {comments &&
              comments.map((comment, index) => {
                return (
                  <MDBCol md="12" lg="12" key={comment.id}>
                    <MDBRow className="mb-4">
                      <div className="col-2 col-sm-1 col-md-2 col-lg-1">
                        {comment.user?.avatar ? (
                          <img
                            src={comment.user?.avatar}
                            className={style.img}
                            alt="user"
                          />
                        ) : (
                          <MDBIcon icon="user-circle" size="2x" />
                        )}
                      </div>
                      <div
                        className={`${style.author} col-10 col-sm-10 col-md-10 col-lg-11 m-0 p-0`}
                      >
                        <div className="float-left">
                          <span className="font-weight-bold mr-2">
                            @{comment.user?.username}
                          </span>
                          <span>
                            <Moment fromNow>{comment.createdAt}</Moment>
                          </span>
                        </div>
                        <div className="float-right pr-2">
                          <MDBDropdown dropleft>
                            <MDBDropdownToggle color="primary" tag="div">
                              <MDBIcon icon="ellipsis-v" />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu basic>
                              {comment.user?.id === user?.id ? (
                                <>
                                  <MDBDropdownItem
                                    onClick={async () => {
                                      await deleteComment(comment.id, user.id);
                                      await mutate();
                                    }}
                                  >
                                    Delete
                                  </MDBDropdownItem>
                                  <MDBDropdownItem
                                    onClick={() => {
                                      onSelectedCommentRow(index);
                                    }}
                                  >
                                    Update
                                  </MDBDropdownItem>
                                </>
                              ) : (
                                <MDBDropdownItem
                                  onClick={async () => {
                                    onSelectedComment(comment.id);
                                  }}
                                >
                                  <MDBIcon icon="flag" className="mr-2" />{" "}
                                  Report
                                </MDBDropdownItem>
                              )}
                            </MDBDropdownMenu>
                          </MDBDropdown>
                        </div>
                        <div className={`${style.content} `}>
                          {openUpdateComment === true &&
                            selectedCommentRow === index && (
                              <UpdateComment
                                id={comment.id}
                                child={false}
                                content={comment.content}
                                onSuccess={async () => {
                                  await setOpenUpdateComment(false);
                                  await mutate();
                                }}
                                onAbort={() => setOpenUpdateComment(false)}
                              />
                            )}
                          {!openUpdateComment && <div>{comment.content}</div>}
                        </div>
                        <ChildComments comment={comment.id} />
                      </div>
                    </MDBRow>
                  </MDBCol>
                );
              })}
          </MDBRow>
          <div className="text-center">
            {comments.length > 0 && (
              <MDBBtn
                color={isMounted && theme === "light" ? "black" : "white"}
                disabled={isLoadingMore || isReachingEnd}
                onClick={() => setSize(size + 1)}
                size="sm"
                className="text-lowercase"
              >
                {isLoadingMore
                  ? "loading..."
                  : isReachingEnd
                  ? "No more comments"
                  : "Load more"}
              </MDBBtn>
            )}
          </div>
        </>
      )}
    </div>
  );
};
