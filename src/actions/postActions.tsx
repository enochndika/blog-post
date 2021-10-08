import useSWR from 'swr';
import cogoToast from 'cogo-toast';
import { convertToRaw } from 'draft-js';

import api from '@/config/axios';
import { fetcher, fetches } from './fetcher';
import { toastError, toastSuccess } from '@/utils/toast';

const useFetchCategories = () => {
  const { data, error, mutate } = useSWR(`/post-categories`, fetcher);
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

const useFetchPostLikes = (postId: number) => {
  const { data, error, mutate } = useSWR(
    postId ? `/like-posts/${postId}` : null,
    fetches,
  );
  return {
    likes: data?.data,
    totalLikes: data?.count,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

const useFetchTotalPostLikedByUser = (userId: number) => {
  const { data, error, mutate } = useSWR(
    userId ? `/like-posts/user/${userId}` : null,
    fetcher,
  );

  return {
    likes: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

const useFetchPostsByUser = (userId: number) => {
  const { data, error, mutate } = useSWR(
    userId ? `/posts/author/${userId}` : null,
    fetcher,
  );

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

const useFetchPostRelated = (post: { id: number }) => {
  const { data, mutate, error } = useSWR(
    post ? `/posts/related/${post?.id}?limit=8` : null,
    fetcher,
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

const useFetchPost = (post: any, slug: string | string[]) => {
  const { data, error, mutate } = useSWR(
    slug ? `/posts/read/${slug} ` : null,
    fetches,
    { initialData: post ? post : null },
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

const addPost = async (userId: number, values, content) => {
  const formData = new FormData();

  for (const key of Object.keys(values.picture)) {
    formData.append('picture', values.picture[key]);
  }

  try {
    const { data: image } = await api.post(`/upload`, formData);
    if (image) {
      const res = await api.post(`/posts/${userId}`, {
        title: values.title,
        content: convertToRaw(content.getCurrentContent()),
        description: values.description,
        categoryId: parseInt(values.categoryId, 10),
        read_time: values.read_time,
        image: [image.url],
      });
      if (res.data) {
        toastSuccess('Post crée');
        return res.data;
      }
    } else {
      toastError('Une erreur est survenue, réessayer plus tard');
    }
  } catch (e) {
    toastError(e.response.data.message);
  }
};

const updatePost = async (
  values,
  userId: number,
  content: any,
  successMessage?: string,
  errorMessage?: string,
) => {
  const data = {
    title: values.title,
    description: values.description,
    content: convertToRaw(content.getCurrentContent()),
    categoryId: parseInt(values.categoryId, 10),
    read_time: parseInt(values.read_time, 10),
    picture: values.image,
  };
  try {
    const res = await api.put(`/posts/${values.id}/${userId}`, data);
    if (res) {
      toastSuccess(successMessage);
      return res;
    }
  } catch (e) {
    toastError(errorMessage);
  }
};

const deletePost = async (postId: number, userId: number) => {
  try {
    await api.delete(`/posts/${postId}/${userId}`);
    toastSuccess('Post supprimé');
  } catch (e) {
    toastError(e.response.data.message);
  }
};

const deletePostByAdmin = async (postId: number) => {
  try {
    await api.delete(`/posts/${postId}`);
    toastSuccess('Post supprimé');
  } catch (e) {
    toastError(e.response.data.message);
  }
};

const addPicture = async (file: File) => {
  const formData = new FormData();
  formData.append('picture', file);
  try {
    const { data } = await api.post(`/upload`, formData);
    return {
      data: {
        link: data?.url,
      },
    };
  } catch (e) {
    toastError('Une erreur est survenue');
  }
};

const likePost = async (postId: number, userId: number) => {
  try {
    await api.post(`/like-posts/${postId}/${userId}`);
  } catch (e) {
    if (e.response.status === 400) {
      cogoToast.info('Vous aimez déjà ce post');
    }
  }
};

const unlikePost = async (postId: number, userId: number) => {
  try {
    await api.delete(`/like-posts/${postId}/${userId}`);
  } catch (e) {
    console.log(e);
  }
};

const reportPost = async (
  postId: number,
  userId: number,
  subject: string,
  successMessage?: string,
  errorMessage?: string,
) => {
  try {
    await api.post(`/report-posts/${postId}/${userId}`, subject);
    cogoToast.info(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};

const addPostCategory = async (values: { name: string }) => {
  try {
    await api.post(`/post-categories`, { name: values.name });
  } catch (e) {
    toastError('Une erreur est survenue');
  }
};

const deletePostCategory = async (id: number, mutate: () => void) => {
  try {
    await api.delete(`/post-categories/${id}`);
    await mutate();
    toastSuccess('Catégorie supprimée');
  } catch (e) {
    toastError('Une erreur est survenue');
  }
};

const deletePostReport = async (id: number, mutate: () => void) => {
  try {
    await api.delete(`/report-posts/${id}`);
    await mutate();
    toastSuccess('Signalement supprimé');
  } catch (e) {
    toastError(e.response.data.message);
  }
};

export {
  deletePost,
  useFetchPostsByUser,
  deletePostReport,
  deletePostByAdmin,
  deletePostCategory,
  useFetchPost,
  addPicture,
  addPost,
  addPostCategory,
  likePost,
  reportPost,
  unlikePost,
  updatePost,
  useFetchCategories,
  useFetchPostLikes,
  useFetchPostRelated,
  useFetchTotalPostLikedByUser,
};
