import api from "../utils/axios";
import { toastError, toastSuccess } from "../utils/toast";
import cogoToast from "cogo-toast";

export const addChildComment = async (values, errorMessage) => {
  try {
    await api.post(`/child-comments/${values.commentId}`, {
      content: values.content,
      userId: values.userId,
    });
  } catch (e) {
    toastError(errorMessage);
  }
};

export const updateChildComment = async (userId, values, errorMessage) => {
  try {
    await api.put(`/child-comments/${values.id}`, {
      content: values.content,
    });
  } catch (e) {
    toastError(errorMessage);
  }
};
export const deleteChildComment = async (id, userId, errorMessage) => {
  try {
    await api.delete(`/child-comments/user/${id}/${userId}`);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const deleteChildCommentByAdmin = async (id) => {
  try {
    await api.delete(`/child-comments/admin/${id}`);
    toastSuccess("Commentaire supprimé");
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};

export const reportChildComment = async (
  childCommentId,
  userId,
  subject,
  successMessage,
  errorMessage
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
