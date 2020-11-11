import api from "../utils/axios";
import { removeCookie, setCookie } from "../auth/cookies";
import { toastError, toastSuccess } from "../utils/toast";
import Router from "next/router";
import axios from "axios";

export const signin = async (username, password, success, error) => {
  try {
    const { data: token } = await api.post(`/signin`, {
      username: username,
      password: password,
    });
    setCookie("blog-jwt-token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    toastSuccess(success);
    await Router.push("/");
  } catch (e) {
    toastError(error);
  }
};

export const signup = async (values, successMessage, errorMessage) => {
  try {
    await api.post(`/signup`, {
      username: values.username,
      password: values.password,
      fullName: values.fullName,
    });
    toastSuccess(successMessage);
    await Router.push("/signin");
  } catch (e) {
    toastError(errorMessage);
  }
};

export const logout = async () => {
  await removeCookie("blog-jwt-token");
  await Router.push("/");
};

export const updateUser = async (values, id, successMessage, errorMessage) => {
  const data = {
    fullName: values.fullName,
  };
  try {
    await api.put(`/users/${id}`, data);
    toastSuccess(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const deleteUser = async (id, successMessage, errorMessage) => {
  try {
    await api.delete(`/users/${id}`);
    toastSuccess(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};

export const deleteUserByAdmin = async (id) => {
  try {
    await api.delete(`/users/admin/${id}`);
    toastSuccess("Utilisateur supprimé");
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};

export const sendingMail = async (values, successMessage, errorMessage) => {
  try {
    await axios.post(process.env.NEXT_PUBLIC_SENDMAIL, values);
    toastSuccess(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};
