import api from "../utils/axios";
import { toastError, toastSuccess } from "../utils/toast";
import cogoToast from "cogo-toast";
import { useSWRInfinite } from "swr";
import { fetcher } from "./fetcher";

const LIMIT = 6;

export const useFetchComments = (post: number) => {
  const { data, error, size, mutate, setSize } = useSWRInfinite(
    (index) =>
      post ? `/comments/${post}?page=${index + 1}&limit=${LIMIT}` : null,
    fetcher
  );

  const comments = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
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

export const addComment = async (
  postId: number,
  values,
  errorMessage?: string
) => {
  try {
    await api.post(`/comments/${postId}`, values);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const updateComment = async (
  userId: number,
  values,
  errorMessage?: string
) => {
  try {
    await api.put(`/comments/${values.id}/${userId}`, {
      content: values.content,
    });
  } catch (e) {
    toastError(errorMessage);
  }
};

export const deleteComment = async (
  id: number,
  userId: number,
  errorMessage?: string
) => {
  try {
    await api.delete(`/comments/user/${id}/${userId}`);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const deleteCommentByAdmin = async (id: number) => {
  try {
    await api.delete(`/comments/admin/${id}`);
    toastSuccess("Commentaire supprimé");
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};

export const reportComment = async (
  commentId: number,
  userId: number,
  subject: string,
  successMessage?: string,
  errorMessage?: string
) => {
  try {
    await api.post(`/report-comments/${commentId}/${userId}`, subject);
    cogoToast.info(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const deleteReportComment = async (id: number, mutate: () => void) => {
  try {
    await api.delete(`/report-comments/${id}`);
    await mutate();
    toastSuccess("Signalement supprimé");
  } catch (e) {
    toastError(e.response.data.message);
  }
};
