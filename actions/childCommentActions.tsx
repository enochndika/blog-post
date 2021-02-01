import api from "../utils/axios";
import { toastError, toastSuccess } from "../utils/toast";
import cogoToast from "cogo-toast";

export const addChildComment = async (
  values: {
    content: string;
    userId: number;
    commentId: number;
  },
  errorMessage?: string
) => {
  try {
    await api.post(`/child-comments/${values.commentId}`, {
      content: values.content,
      userId: values.userId,
    });
  } catch (e) {
    toastError(errorMessage);
  }
};

export const updateChildComment = async (
  userId: number,
  values: {
    content: string;
    id: number;
  },
  errorMessage?: string
) => {
  try {
    await api.put(`/child-comments/${values.id}`, {
      content: values.content,
    });
  } catch (e) {
    toastError(errorMessage);
  }
};
export const useDeleteChildComment = async (
  id: number,
  userId: number,
  errorMessage?: string
) => {
  try {
    await api.delete(`/child-comments/user/${id}/${userId}`);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const useDeleteChildCommentByAdmin = async (id: number) => {
  try {
    await api.delete(`/child-comments/admin/${id}`);
    toastSuccess("Commentaire supprimé");
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};

export const useReportChildComment = async (
  childCommentId: number,
  userId: number,
  subject: string,
  successMessage?: string,
  errorMessage?: string
) => {
  try {
    await api.post(
      `/report-child-comments/${childCommentId}/${userId}`,
      subject
    );
    cogoToast.info(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const useDeleteReportChildComment = async (
  id: number,
  mutate: () => void
) => {
  try {
    await api.delete(`/report-child-comments/${id}`);
    await mutate();
    toastSuccess("Signalement supprimé");
  } catch (e) {
    toastError(e.response.data.message);
  }
};
