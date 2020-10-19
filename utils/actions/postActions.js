import { toastError, toastSuccess } from "../toast";
import api from "../axios";
import useSWR from "swr";
import { fetcher, fetches } from "./fetcher";
import { convertToRaw } from "draft-js";
import cogoToast from "cogo-toast";

export const fetchCategories = () => {
  const { data, error, mutate } = useSWR(`/post-categories`, fetcher);
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export const fetchPostLikes = (postId) => {
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

export const fetchTotalPostLikedByUser = (userId) => {
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

export const fetchPostsByUser = (userId) => {
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

export const fetchPost = (slug) => {
  const { data, error, mutate } = useSWR(
    slug ? `/posts/read/${slug} ` : null,
    fetches
  );
  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export const addPost = async (userId, values) => {
  const formData = new FormData();
  for (const key of Object.keys(values.picture)) {
    formData.append("picture", values.picture[key]);
  }
  try {
    const { data: image } = await api.post(`/upload`, formData);
    if (image) {
      await api.post(`/posts/${userId}`, {
        title: values.title,
        content: convertToRaw(values.content.getCurrentContent()),
        description: values.description,
        postsCategoryId: parseInt(values.postsCategoryId, 10),
        read_time: values.read_time,
        image: [image],
      });
      toastSuccess("Post added");
    } else {
      toastError("An error has occured, please try again");
    }
  } catch (e) {
    toastError(e.response.data.message);
  }
};

export const updatePost = async (values, userId, content) => {
  const data = {
    title: values.title,
    description: values.description,
    content: convertToRaw(content.getCurrentContent()),
    postsCategoryId: values.postsCategoryId,
    read_time: values.postsCategoryId,
    picture: values.postsCategoryId,
  };
  try {
    await api.put(`/posts/${values.id}/${userId}`, data);
  } catch (e) {
    toastError("An error has occured");
  }
};

export const deletePost = async (postId, userId) => {
  try {
    await api.delete(`/posts/${postId}/${userId}`);
    toastSuccess("Post deleted");
  } catch (e) {
    toastError(e.response.data.message);
  }
};

export const deletePostByAdmin = async (postId) => {
  try {
    await api.delete(`/posts/${postId}`);
    toastSuccess("Post deleted");
  } catch (e) {
    toastError(e.response.data.message);
  }
};

export const addPicture = async (file) => {
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
    toastError("An error has occured");
  }
};

export const likePost = async (postId, userId) => {
  try {
    await api.post(`/like-posts/${postId}/${userId}`);
  } catch (e) {
    if (e.response.status === 400) {
      cogoToast.info("You already liked this post");
    }
    console.log(e);
  }
};

export const unlikePost = async (postId, userId) => {
  try {
    await api.delete(`/like-posts/${postId}/${userId}`);
  } catch (e) {
    console.log(e);
  }
};

export const reportPost = async (postId, userId, subject) => {
  try {
    await api.post(`/report-posts/${postId}/${userId}`, subject);
    cogoToast.info("Your report has been sent");
  } catch (e) {
    toastError("An error has occured");
  }
};

export const addPostCategory = async (values) => {
  try {
    await api.post(`/post-categories`, { name: values.name });
  } catch (e) {
    toastError("An error has occured");
  }
};

export const updatePostCategory = async (id, values) => {
  try {
    await api.put(`/post-categories/${id}`, { name: values.name });
  } catch (e) {
    toastError("An error has occured");
  }
};

export const deletePostCategory = async (id) => {
  try {
    await api.delete(`/post-categories/${id}`);
  } catch (e) {
    toastError("An error has occured");
  }
};
