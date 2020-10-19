import api from "../axios";
import { removeCookie, setCookie } from "../../auth/cookies";
import { toastError, toastSuccess } from "../toast";
import Router from "next/router";
import axios from "axios";

export const signin = async (username, password) => {
  try {
    const { data: token } = await api.post(`/signin`, {
      username: username,
      password: password,
    });
    setCookie("blog-jwt-token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    toastSuccess("You are now authenticated");
    await Router.push("/");
  } catch (e) {
    toastError("An error has occured");
  }
};

export const signup = async (values) => {
  try {
    await api.post(`/signup`, {
      username: values.username,
      password: values.password,
      fullName: values.fullName,
    });
    toastSuccess("Account created, please login");
    await Router.push("/signin");
  } catch (e) {
    toastError("An error has occured");
  }
};

export const logout = async () => {
  await removeCookie("blog-jwt-token");
  await Router.push("/");
};

export const updateUser = async (values, id) => {
  const data = {
    fullName: values.fullName,
  };
  try {
    await api.put(`/users/${id}`, data);
    toastSuccess("Profile updated");
  } catch (e) {
    toastError("An error has occured");
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    toastSuccess("Utilisateur supprimé");
  } catch (e) {
    toastError("An error has occured");
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

export const sendingMail = async (values) => {
  try {
    await axios.post(`/api/sendmail`, values);
    toastSuccess("Message sent");
  } catch (e) {
    toastError("An error has occured");
  }
};
