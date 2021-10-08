import { useState } from 'react';
import cogoToast from 'cogo-toast';
import { useSWRInfinite } from 'swr';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import api from '@/config/axios';
import Row from '@/components/ui/row';
import ReportModal from '../others/reportModal';
import UpdateComment from '../comments/updateComment';
import Collapse from '@/components/ui/collapse';
import Dropdown from '@/components/ui/dropdown';
import AddChildComment from './addChildComment';
import { Button } from '@/components/ui/button';
import { formatNumericDate } from '@/utils/formats';
import FlagIcon from '@/components/icons/others/flag';
import ReplyIcon from '@/components/icons/others/reply';
import { useFetchUserProfile } from '@/actions/userActions';
import CommentsIcon from '@/components/icons/others/comments';
import EllipsisVIcon from '@/components/icons/others/ellipsisV';
import UserCircleIcon from '@/components/icons/human/userCircle';
import { deleteChildComment } from '@/actions/childCommentActions';

const fetcher = (url) => api.get(url).then((res) => res.data.data);
const LIMIT = 6;

export const ChildComments = ({ comment }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [openUpdateComment, setOpenUpdateComment] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [selectedCommentRow, setSelectedCommentRow] = useState(undefined);
  const [commentId, setCommentId] = useState(null);
  const { user } = useFetchUserProfile();

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (index) => `/child-comments/${comment}?page=${index + 1}&limit=${LIMIT}`,
    fetcher,
  );

  const onSelectedCommentRow = (index) => {
    if (user) {
      setSelectedCommentRow(index);
      setOpenUpdateComment(true);
    }
  };

  const onSelectedComment = (id) => {
    if (!user) {
      return cogoToast.info(t('Helpers.comments.selectCommentNotAuth'), {
        position: 'top-right',
      });
    }
    setCommentId(id);
    setReportModal(true);
  };

  const toggleReportModal = () => {
    setReportModal(!reportModal);
  };

  const comments = data && data.length > 0 ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  return (
    <>
      <Collapse>
        <div className="flex mt-4 text-xs font-bold cursor-pointer">
          <ReplyIcon className="mt-0.5 pr-1 h-2.5" />
          {t('Helpers.childComments.collapseTitle')}
        </div>
        <AddChildComment comment={comment} mutate={mutate} />
      </Collapse>
      <Collapse>
        <div className="flex mt-2 text-xs font-bold cursor-pointer">
          {comments && comments.length > 0 && (
            <div className="font-weight-bolder flex mr-2">
              <CommentsIcon className="pr-2 h-3" />
              {t('Helpers.childComments.title')}
            </div>
          )}
        </div>
        <div className="mt-4 md:ml-6">
          <ReportModal
            isOpen={reportModal}
            toggle={toggleReportModal}
            userId={user?.id}
            child={true}
            id={commentId}
          />
          <Row>
            {comments &&
              comments.map((comment, index) => (
                <div className="col-12" key={comment.id}>
                  <Row className="mb-4">
                    <div className="col-3 md:col-2 lg:col-1 -mr-2">
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
                    <div className="col-9 md:col-10 lg:col-11 -ml-6 text-sm md:-ml-16 lg:-ml-4 xl:-ml-3">
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
                      <div className="float-right">
                        <Dropdown>
                          <Dropdown.Toggle className="flex">
                            <EllipsisVIcon className="mt-1 h-3" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu left={true}>
                            {comment.user.id === user?.id ? (
                              <>
                                <Dropdown.Item
                                  onClick={async () => {
                                    await deleteChildComment(
                                      comment.id,
                                      user && user.id,
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
                        {openUpdateComment && selectedCommentRow === index && (
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
                        {!openUpdateComment && (
                          <div className="mt-8">{comment.content}</div>
                        )}
                      </div>
                    </div>
                  </Row>
                </div>
              ))}
          </Row>
          <div className="text-center">
            {comments && comments.length > 0 && !isReachingEnd && (
              <Button
                color="dark"
                disabled={isLoadingMore || isReachingEnd}
                onClick={() => setSize(size + 1)}
                size="sm"
              >
                {isLoadingMore
                  ? t('Helpers.comments.pagination.loading')
                  : isReachingEnd
                  ? 'Fin de commentaires'
                  : t('Helpers.comments.pagination.loadMore')}
              </Button>
            )}
          </div>
        </div>
      </Collapse>
    </>
  );
};
