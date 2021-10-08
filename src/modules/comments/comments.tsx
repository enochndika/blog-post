import { useState } from 'react';
import cogoToast from 'cogo-toast';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Row from '@/components/ui/row';
import AddComment from './addComment';
import UpdateComment from './updateComment';
import ReportModal from '../others/reportModal';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import { formatNumericDate } from '@/utils/formats';
import FlagIcon from '@/components/icons/others/flag';
import { useFetchUserProfile } from '@/actions/userActions';
import { ChildComments } from '../childComments/childComments';
import AngleUpIcon from '@/components/icons/direction/angleUp';
import EllipsisVIcon from '@/components/icons/others/ellipsisV';
import UserCircleIcon from '@/components/icons/human/userCircle';
import AngleDownIcon from '@/components/icons/direction/angleDown';
import { deleteComment, useFetchComments } from '@/actions/commentActions';

const Comments = ({ post }) => {
  const { t } = useTranslation();
  const [openUpdateComment, setOpenUpdateComment] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [selectedCommentRow, setSelectedCommentRow] = useState(undefined);
  const [commentId, setCommentId] = useState(null);

  const { comments, isLoadingMore, isReachingEnd, mutate, setSize, size } =
    useFetchComments(post);
  const router = useRouter();
  const { user } = useFetchUserProfile();

  const onSelectedCommentRow = (index) => {
    if (user) {
      setSelectedCommentRow(index);
      setOpenUpdateComment(true);
    }
  };

  const onSelectedComment = (id) => {
    if (!user) {
      return cogoToast.info(t('Helpers.comments.selectCommentNotAuth'));
    }
    setCommentId(id);
    setReportModal(!reportModal);
  };

  const toggleReportModal = () => {
    setReportModal(!reportModal);
  };

  return (
    <div className="ml-1 mt-5">
      <AddComment post={post} mutate={mutate} />
      {comments && comments.length > 0 && (
        <div className="mb-10 text-2xl font-medium">
          <span onClick={() => setShowComments(!showComments)} className="flex">
            {t('Helpers.comments.title')}
            {showComments ? (
              <AngleDownIcon className="ml-1 mt-2 h-5" />
            ) : (
              <AngleUpIcon className="ml-1 mt-2 h-5" />
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
              comments.map((comment, index) => (
                <div className="col-12 mb-5" key={comment.id}>
                  <Row className="mb-4">
                    <div className="col-2 sm:col-1 md:col-2 lg:col-1">
                      {comment.user?.avatar ? (
                        <img
                          src={comment.user?.avatar}
                          className="w-10 h-8 rounded-full"
                          alt="user"
                        />
                      ) : (
                        <UserCircleIcon className="h-5" />
                      )}
                    </div>
                    <div className="col-10 sm:col-11 lg:col-11 -ml-5 md:-ml-16 lg:-ml-5">
                      <div className="float-left">
                        <span className="mr-2 font-medium">
                          @{comment.user?.username}
                        </span>
                        <span>
                          <small className="font-medium">
                            {router?.locale === 'fr'
                              ? formatNumericDate(comment.createdAt, 'fr-FR')
                              : formatNumericDate(comment.createdAt, 'en-US')}
                          </small>
                        </span>
                      </div>
                      <div className="float-right pr-2">
                        <Dropdown>
                          <Dropdown.Toggle className="flex">
                            <EllipsisVIcon className="mt-1 h-3" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu left={true}>
                            {comment.user?.id === user?.id ? (
                              <>
                                <Dropdown.Item
                                  onClick={async () => {
                                    await deleteComment(
                                      comment.id,
                                      user.id,
                                      t('Actions.error'),
                                    );
                                    await mutate();
                                  }}
                                >
                                  {t('Helpers.comments.dropdown.delete')}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    onSelectedCommentRow(index);
                                  }}
                                >
                                  {t('Helpers.comments.dropdown.update')}
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
                                  {t('Helpers.comments.dropdown.report')}
                                </div>
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="clear-left mt-4 pr-4 whitespace-pre-wrap text-small">
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
              ))}
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
                  ? t('Helpers.comments.pagination.loading')
                  : isReachingEnd
                  ? 'fin de commentaires'
                  : t('Helpers.comments.pagination.loadMore')}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;
