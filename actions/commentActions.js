import api from "../utils/axios";
import { toastError, toastSuccess } from "../utils/toast";
import cogoToast from "cogo-toast";

export const addComment = async (postId, values, errorMessage) => {
  try {
    await api.post(`/comments/${postId}`, values);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const updateComment = async (userId, values, errorMessage) => {
  try {
    await api.put(`/comments/${values.id}/${userId}`, {
      content: values.content,
    });
  } catch (e) {
    toastError(errorMessage);
  }
};
export const deleteComment = async (id, userId, errorMessage) => {
  try {
    await api.delete(`/comments/user/${id}/${userId}`);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const deleteCommentByAdmin = async (id) => {
  try {
    await api.delete(`/comments/admin/${id}`);
    toastSuccess("Commentaire supprimé");
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};

export const reportComment = async (
  commentId,
  userId,
  subject,
  successMessage,
  errorMessage
) => {
  try {
    await api.post(`/report-comments/${commentId}/${userId}`, subject);
    cogoToast.info(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};
