import { useSWRInfinite } from 'swr';
import api from '../utils/axios';
import { useState } from 'react';
import { loggedUser } from '../auth/useUser';
import cogoToast from 'cogo-toast';
import { useDeleteChildComment } from '../actions/childCommentActions';
import { useTranslation } from 'react-i18next';
import { formatNumericDate } from '../utils/formats';
import { useRouter } from 'next/router';
import { Collapse } from '../components/ui/collapse';
import { Button } from '../components/ui/button';
import Row from '../components/ui/row';
import {
  CommentsIcon,
  EllipsisVIcon,
  FlagIcon,
  ReplyIcon,
  UserCircleIcon,
} from '../components/ui/icons';
import Dropdown from '../components/ui/dropdown';
import { AddChildComment } from './addChildComment';
import { ReportModal } from './reportModal';
import { UpdateComment } from './updateComment';

const fetcher = (url) => api.get(url).then((res) => res.data.data);
const LIMIT = 6;

export const ChildComments = ({ comment }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [openUpdateComment, setOpenUpdateComment] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [selectedCommentRow, setSelectedCommentRow] = useState(undefined);
  const [commentId, setCommentId] = useState(null);
  const { user } = loggedUser();

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
      cogoToast.info(t('Helpers.comments.selectCommentNotAuth'), {
        position: 'top-right',
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
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  return (
    <div>
      <Collapse>
        <div className="flex text-xs font-bold mt-4 cursor-pointer">
          <ReplyIcon className="h-2.5 pr-1 mt-0.5" />
          {t('Helpers.childComments.collapseTitle')}
        </div>
        <AddChildComment comment={comment} mutate={mutate} />
      </Collapse>
      <Collapse>
        <div className="flex text-xs font-bold mt-2 cursor-pointer">
          {comments && comments.length > 0 && (
            <div className="flex mr-2 font-weight-bolder">
              <CommentsIcon className="h-3 pr-2" />
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
                    <div className="col-3  md:col-2 lg:col-1">
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
                    <div className="col-9 md:col-10 lg:col-11 -ml-5 md:-ml-12 lg:-ml-5 text-sm">
                      <div className="float-left">
                        <span className="font-medium mr-2">
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
                            <EllipsisVIcon className="h-3 mt-1" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu left={true}>
                            {comment.user.id === user?.id ? (
                              <>
                                <Dropdown.Item
                                  onClick={async () => {
                                    await useDeleteChildComment(
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
                      <div className="whitespace-pre-wrap mt-4 pr-4 text-small clear-left">
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
    </div>
  );
};
