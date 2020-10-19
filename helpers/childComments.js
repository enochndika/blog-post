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
import style from "../styles/helpers/childComments.module.css";
import Moment from "react-moment";
import { useSWRInfinite } from "swr";
import api from "../utils/axios";
import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";
import { Collapse } from "../components/collapse";
import { useState } from "react";
import { UpdateComment } from "./updateComment";
import { loggedUser } from "../auth/useUser";
import cogoToast from "cogo-toast";
import { ReportModal } from "./reportModal";
import { deleteChildComment } from "../utils/actions/childCommentActions";
import { AddChildComment } from "./addChildComment";

const fetcher = (url) => api.get(url).then((res) => res.data.data);
const LIMIT = 6;

export const ChildComments = ({ comment }) => {
  const [openUpdateComment, setOpenUpdateComment] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [selectedCommentRow, setSelectedCommentRow] = useState(undefined);
  const [commentId, setCommentId] = useState(null);
  const { theme } = useTheme();
  const isMounted = useMounted();
  const { user } = loggedUser();

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (index) => `/child-comments/${comment}?page=${index + 1}&limit=${LIMIT}`,
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
      cogoToast.info("You must login before reporting a comment", {
        position: "top-right",
      });
    }
    if (user) {
      setCommentId(id);
      setReportModal(true);
    }
  };

  const toggleReportModal = () => {
    setReportModal(!reportModal);
  };

  const comments = data && data.length > 0 ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  return (
    <div className={style.main}>
      <div>
        <Collapse title="Reply">
          <AddChildComment comment={comment} mutate={mutate} />
        </Collapse>
      </div>
      <Collapse
        title={
          <>
            {comments && comments.length > 0 && (
              <span className="ml-3 mt-3 mr-2 font-weight-bolder">
                Show replies
              </span>
            )}
          </>
        }
        icon={comments && comments.length > 0}
      >
        <div className="mt-4 ml-1">
          <ReportModal
            isOpen={reportModal}
            toggle={toggleReportModal}
            userId={user?.id}
            child={true}
            id={commentId}
          />
          <MDBRow className={style.row}>
            {comments &&
              comments.map((comment, index) => (
                <MDBCol md="12" lg="12" key={comment.id}>
                  <MDBRow className="mb-2">
                    <div className="col-2 col-sm-1 col-md-1 col-lg-1">
                      {comment.user.avatar ? (
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
                      className={`${style.author} col-10 col-sm-10 col-md-11 col-lg-11 m-0 p-0`}
                    >
                      <div className="float-left">
                        <span className="font-weight-bold mr-2">
                          @{comment.user?.username}
                        </span>
                        <span className={style.date}>
                          <Moment fromNow>{comment.createdAt}</Moment>
                        </span>
                      </div>
                      <div className="float-right pr-2">
                        <MDBDropdown dropleft>
                          <MDBDropdownToggle color="primary" tag="div">
                            <MDBIcon icon="ellipsis-v" />
                          </MDBDropdownToggle>
                          <MDBDropdownMenu basic>
                            {comment.user.id === user?.id ? (
                              <>
                                <MDBDropdownItem
                                  onClick={async () => {
                                    await deleteChildComment(
                                      comment.id,
                                      user && user.id
                                    );
                                    await mutate();
                                  }}
                                >
                                  delete
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
                              child={true}
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
                    </div>
                  </MDBRow>
                </MDBCol>
              ))}
          </MDBRow>
          <div className="text-center">
            {comments && comments.length > 0 && (
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
                  ? "no more comments"
                  : "load more"}
              </MDBBtn>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  );
};
