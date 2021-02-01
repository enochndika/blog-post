import { toastError, toastSuccess } from "../utils/toast";
import api from "../utils/axios";
import useSWR from "swr";
import { fetcher, fetches } from "./fetcher";
import { convertToRaw } from "draft-js";
import cogoToast from "cogo-toast";

export const useFetchCategories = () => {
  const { data, error, mutate } = useSWR(`/post-categories`, fetcher);
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export const useFetchPostLikes = (postId: number) => {
  const { data, error, mutate } = useSWR(
    postId ? `/like-posts/${postId}` : null,
    fetcher
  );
  return {
    likes: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export const useFetchTotalPostLikedByUser = (userId: number) => {
  const { data, error, mutate } = useSWR(
    userId ? `/like-posts/total/${userId}` : null,
    fetcher
  );
  return {
    likes: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export const useFetchPostsByUser = (userId: number) => {
  const { data, error, mutate } = useSWR(
    userId ? `/post-filters/user/${userId}` : null,
    fetcher
  );
  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export const useFetchPostRelated = (post: { id: number }) => {
  const { data, mutate, error } = useSWR(
    post ? `/post-filters/related/${post?.id}?limit=8` : null,
    fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export const useFetchPost = (post: any, slug: string | string[]) => {
  const { data, error, mutate } = useSWR(
    slug ? `/posts/read/${slug} ` : null,
    fetches,
    { initialData: post ? post : null }
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export const addPost = async (userId: number, values, content) => {
  const formData = new FormData();

  for (const key of Object.keys(values.picture)) {
    formData.append("picture", values.picture[key]);
  }

  try {
    const { data: image } = await api.post(`/upload`, formData);
    if (image) {
      await api.post(`/posts/${userId}`, {
        title: values.title,
        content: convertToRaw(content.getCurrentContent()),
        description: values.description,
        postsCategoryId: parseInt(values.postsCategoryId, 10),
        read_time: values.read_time,
        image: [image],
      });
      toastSuccess("Post crée");
    } else {
      toastError("Une erreur est survenue, réessayer plus tard");
    }
  } catch (e) {
    toastError(e.response.data.message);
  }
};

export const updatePost = async (
  values,
  userId: number,
  content: any,
  successMessage?: string,
  errorMessage?: string
) => {
  const data = {
    title: values.title,
    description: values.description,
    content: convertToRaw(content.getCurrentContent()),
    postsCategoryId: parseInt(values.postsCategoryId, 10),
    read_time: parseInt(values.read_time, 10),
    picture: values.image,
  };
  try {
    await api.put(`/posts/${values.id}/${userId}`, data);
    toastSuccess(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const deletePost = async (postId: number, userId: number) => {
  try {
    await api.delete(`/posts/${postId}/${userId}`);
    toastSuccess("Post supprimé");
  } catch (e) {
    toastError(e.response.data.message);
  }
};

export const deletePostByAdmin = async (postId: number) => {
  try {
    await api.delete(`/posts/${postId}`);
    toastSuccess("Post supprimé");
  } catch (e) {
    toastError(e.response.data.message);
  }
};

export const addPicture = async (file: File) => {
  const formData = new FormData();
  formData.append("picture", file);
  try {
    const { data } = await api.post(`/upload`, formData);
    return {
      data: {
        link: data,
      },
    };
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};

export const likePost = async (postId: number, userId: number) => {
  try {
    await api.post(`/like-posts/${postId}/${userId}`);
  } catch (e) {
    if (e.response.status === 400) {
      cogoToast.info("Vous aimez déjà ce post");
    }
  }
};

export const unlikePost = async (postId: number, userId: number) => {
  try {
    await api.delete(`/like-posts/${postId}/${userId}`);
  } catch (e) {
    console.log(e);
  }
};

export const reportPost = async (
  postId: number,
  userId: number,
  subject: string,
  successMessage?: string,
  errorMessage?: string
) => {
  try {
    await api.post(`/report-posts/${postId}/${userId}`, subject);
    cogoToast.info(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const addPostCategory = async (values: { name: string }) => {
  try {
    await api.post(`/post-categories`, { name: values.name });
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};

/*export const updatePostCategory = async (id, values) => {
  try {
    await api.put(`/post-categories/${id}`, { name: values.name });
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};*/

export const deletePostCategory = async (id: number, mutate: () => void) => {
  try {
    await api.delete(`/post-categories/${id}`);
    await mutate();
    toastSuccess("Catégorie supprimée");
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};

export const deletePostReport = async (id: number, mutate: () => void) => {
  try {
    await api.delete(`/report-posts/${id}`);
    await mutate();
    toastSuccess("Signalement supprimé");
  } catch (e) {
    toastError(e.response.data.message);
  }
};
