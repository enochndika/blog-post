import { deleteComment, useFetchComments } from "../actions/commentActions";
import { ChildComments } from "./childComments";
import { useState } from "react";
import { loggedUser } from "../auth/useUser";
import cogoToast from "cogo-toast";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { formatNumericDate } from "../utils/formats";
import {
  AngleDownIcon,
  AngleUpIcon,
  EllipsisVIcon,
  FlagIcon,
  UserCircleIcon,
} from "../components/ui/icons";
import Row from "../components/ui/row";
import Dropdown from "../components/ui/dropdown";
import { Button } from "../components/ui/button";
import { AddComment } from "./addComment";
import { ReportModal } from "./reportModal";
import { UpdateComment } from "./updateComment";

export const PostComments = ({ post }) => {
  const { t } = useTranslation();
  const [openUpdateComment, setOpenUpdateComment] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [selectedCommentRow, setSelectedCommentRow] = useState(undefined);
  const [commentId, setCommentId] = useState(null);

  const {
    comments,
    isLoadingMore,
    isReachingEnd,
    mutate,
    setSize,
    size,
  } = useFetchComments(post);
  const router = useRouter();
  const { user } = loggedUser();

  const onSelectedCommentRow = (index) => {
    if (user) {
      setSelectedCommentRow(index);
      setOpenUpdateComment(true);
    }
  };

  const onSelectedComment = (id) => {
    if (!user) {
      cogoToast.info(t("Helpers.comments.selectCommentNotAuth"));
    }
    if (user) {
      setCommentId(id);
      setReportModal(!reportModal);
    }
  };

  const toggleReportModal = () => {
    setReportModal(!reportModal);
  };

  return (
    <div className="mt-5 ml-1">
      <AddComment post={post} mutate={mutate} />
      {comments && comments.length > 0 && (
        <div className="text-2xl mb-10 font-medium">
          <span onClick={() => setShowComments(!showComments)} className="flex">
            {t("Helpers.comments.title")}
            {showComments ? (
              <AngleDownIcon className="ml-1 h-5 mt-2" />
            ) : (
              <AngleUpIcon className="ml-1 h-5 mt-2" />
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
          <Row>
            {comments &&
              comments.map((comment, index) => {
                return (
                  <div className="col-12 mb-5" key={comment.id}>
                    <Row className="mb-4">
                      <div className="col-2 sm:col-1 md:col-2 lg:col-1">
                        {comment.user?.avatar ? (
                          <img
                            src={comment.user?.avatar}
                            className="h-8 w-10 rounded-full"
                            alt="user"
                          />
                        ) : (
                          <UserCircleIcon className="h-5" />
                        )}
                      </div>
                      <div className="col-10 sm:col-11 lg:col-11 -ml-5 md:-ml-16 lg:-ml-5">
                        <div className="float-left">
                          <span className="font-medium mr-2">
                            @{comment.user?.username}
                          </span>
                          <span>
                            <small className="font-medium">
                              {router?.locale === "fr"
                                ? formatNumericDate(comment.createdAt, "fr-FR")
                                : formatNumericDate(comment.createdAt, "en-US")}
                            </small>
                          </span>
                        </div>
                        <div className="float-right pr-2">
                          <Dropdown>
                            <Dropdown.Toggle className="flex">
                              <EllipsisVIcon className="h-3 mt-1" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu left={true}>
                              {comment.user?.id === user?.id ? (
                                <>
                                  <Dropdown.Item
                                    onClick={async () => {
                                      await deleteComment(
                                        comment.id,
                                        user.id,
                                        t("Actions.error")
                                      );
                                      await mutate();
                                    }}
                                  >
                                    {t("Helpers.comments.dropdown.delete")}
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => {
                                      onSelectedCommentRow(index);
                                    }}
                                  >
                                    {t("Helpers.comments.dropdown.update")}
                                  </Dropdown.Item>
                                </>
                              ) : (
                                <Dropdown.Item
                                  onClick={async () => {
                                    onSelectedComment(comment.id);
                                  }}
                                >
                                  <div className="flex">
                                    <FlagIcon className="mr-2 h-4" />
                                    {t("Helpers.comments.dropdown.report")}
                                  </div>
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="whitespace-pre-wrap mt-4 pr-4 text-small clear-left">
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
                    </Row>
                  </div>
                );
              })}
          </Row>
          <div className="text-center">
            {comments.length > 0 && !isReachingEnd && (
              <Button
                color="dark"
                disabled={isLoadingMore || isReachingEnd}
                onClick={() => setSize(size + 1)}
                size="sm"
                className="text-lowercase font-weight-bold"
              >
                {isLoadingMore
                  ? t("Helpers.comments.pagination.loading")
                  : isReachingEnd
                  ? "fin de commentaires"
                  : t("Helpers.comments.pagination.loadMore")}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
