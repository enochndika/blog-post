import api from "../axios";
import { toastError, toastSuccess } from "../toast";
import cogoToast from "cogo-toast";

export const addComment = async (postId, values) => {
  try {
    await api.post(`/comments/${postId}`, values);
  } catch (e) {
    toastError("An error has occured");
  }
};

export const updateComment = async (userId, values) => {
  try {
    await api.put(`/comments/${values.id}/${userId}`, {
      content: values.content,
    });
  } catch (e) {
    toastError("An error has occured");
  }
};
export const deleteComment = async (id, userId) => {
  try {
    await api.delete(`/comments/user/${id}/${userId}`);
    toastSuccess("Comment deleted");
  } catch (e) {
    toastError("An error has occured");
  }
};

export const deleteCommentByAdmin = async (id) => {
  try {
    await api.delete(`/comments/admin/${id}`);
    toastSuccess("Comment deleted");
  } catch (e) {
    toastError("An error has occured");
  }
};

export const reportComment = async (commentId, userId, subject) => {
  try {
    await api.post(`/report-comments/${commentId}/${userId}`, subject);
    cogoToast.info("Your report has been sent");
  } catch (e) {
    toastError("An error has occured");
  }
};
