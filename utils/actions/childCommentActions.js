import api from "../axios";
import { toastError, toastSuccess } from "../toast";
import cogoToast from "cogo-toast";

export const addChildComment = async (values) => {
  try {
    await api.post(`/child-comments/${values.commentId}`, {
      content: values.content,
      userId: values.userId,
    });
  } catch (e) {
    toastError("An error has occured");
  }
};

export const updateChildComment = async (userId, values) => {
  try {
    await api.put(`/child-comments/${values.id}`, {
      content: values.content,
    });
  } catch (e) {
    toastError("An error has occured");
  }
};
export const deleteChildComment = async (id, userId) => {
  try {
    await api.delete(`/child-comments/user/${id}/${userId}`);
    toastSuccess("Comment deleted");
  } catch (e) {
    toastError("An error has occured");
  }
};

export const deleteChildCommentByAdmin = async (id) => {
  try {
    await api.delete(`/child-comments/admin/${id}`);
    toastSuccess("Comment deleted");
  } catch (e) {
    toastError("An error has occured");
  }
};

export const reportChildComment = async (childCommentId, userId, subject) => {
  try {
    await api.post(
      `/report-child-comments/${childCommentId}/${userId}`,
      subject
    );
    cogoToast.info("Your report has been sent");
  } catch (e) {
    toastError("An error has occured");
  }
};
