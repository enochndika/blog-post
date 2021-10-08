import cogoToast from 'cogo-toast';
import { useSWRInfinite } from 'swr';

import api from '@/config/axios';
import { fetcher } from './fetcher';
import { toastError, toastSuccess } from '@/utils/toast';

const LIMIT = 6;

const useFetchComments = (post: number) => {
  const { data, error, size, mutate, setSize } = useSWRInfinite(
    (index) =>
      post ? `/comments/${post}?page=${index + 1}&limit=${LIMIT}` : null,
    fetcher,
  );

  const comments = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  return {
    comments,
    mutate: mutate,
    isReachingEnd,
    isLoadingMore,
    size,
    setSize,
  };
};

const addComment = async (postId: number, values, errorMessage?: string) => {
  try {
    await api.post(`/comments/${postId}`, values);
  } catch (e) {
    toastError(errorMessage);
  }
};

const updateComment = async (userId: number, values, errorMessage?: string) => {
  try {
    await api.put(`/comments/${values.id}/${userId}`, {
      content: values.content,
    });
  } catch (e) {
    toastError(errorMessage);
  }
};

const deleteComment = async (
  id: number,
  userId: number,
  errorMessage?: string,
) => {
  try {
    await api.delete(`/comments/${id}/${userId}`);
  } catch (e) {
    toastError(errorMessage);
  }
};

const deleteCommentByAdmin = async (id: number) => {
  try {
    await api.delete(`/comments/admin/${id}`);
    toastSuccess('Commentaire supprimé');
  } catch (e) {
    toastError('Une erreur est survenue');
  }
};

const reportComment = async (
  commentId: number,
  userId: number,
  subject: string,
  successMessage?: string,
  errorMessage?: string,
) => {
  try {
    await api.post(`/report-comments/${commentId}/${userId}`, subject);
    cogoToast.info(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};

const deleteReportComment = async (id: number, mutate: () => void) => {
  try {
    await api.delete(`/report-comments/${id}`);
    await mutate();
    toastSuccess('Signalement supprimé');
  } catch (e) {
    toastError(e.response.data.message);
  }
};

export {
  addComment,
  deleteComment,
  reportComment,
  updateComment,
  useFetchComments,
  deleteReportComment,
  deleteCommentByAdmin,
};
