import cogoToast from 'cogo-toast';

import api from '@/config/axios';
import { toastError, toastSuccess } from '@/utils/toast';

const addChildComment = async (
  values: {
    content: string;
    userId: number;
    commentId: number;
  },
  errorMessage?: string,
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

const updateChildComment = async (
  userId: number,
  values: {
    content: string;
    id: number;
  },
  errorMessage?: string,
) => {
  try {
    await api.put(`/child-comments/${values.id}`, {
      content: values.content,
    });
  } catch (e) {
    toastError(errorMessage);
  }
};

const deleteChildComment = async (
  id: number,
  userId: number,
  errorMessage?: string,
) => {
  try {
    await api.delete(`/child-comments/user/${id}/${userId}`);
  } catch (e) {
    toastError(errorMessage);
  }
};

const deleteChildCommentByAdmin = async (id: number) => {
  try {
    await api.delete(`/child-comments/admin/${id}`);
    toastSuccess('Commentaire supprimé');
  } catch (e) {
    toastError('Une erreur est survenue');
  }
};

const reportChildComment = async (
  childCommentId: number,
  userId: number,
  subject: string,
  successMessage?: string,
  errorMessage?: string,
) => {
  try {
    await api.post(
      `/report-child-comments/${childCommentId}/${userId}`,
      subject,
    );
    cogoToast.info(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};

const deleteReportChildComment = async (id: number, mutate: () => void) => {
  try {
    await api.delete(`/report-child-comments/${id}`);
    await mutate();
    toastSuccess('Signalement supprimé');
  } catch (e) {
    toastError(e.response.data.message);
  }
};

export {
  addChildComment,
  updateChildComment,
  deleteChildComment,
  reportChildComment,
  deleteReportChildComment,
  deleteChildCommentByAdmin,
};
