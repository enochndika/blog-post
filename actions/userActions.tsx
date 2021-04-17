import api from '../utils/axios';
import { removeCookie, setCookie } from '../auth/cookies';
import { toastError, toastSuccess } from '../utils/toast';
import Router from 'next/router';

export const signin = async (
  data: {
    username: string;
    password: string;
  },
  error: string,
) => {
  try {
    const { data: token } = await api.post(`/signin`, data);
    await setCookie('blog-jwt-token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    return token;
  } catch (e) {
    toastError(error);
  }
};

export const signup = async (
  values: {
    username: string;
    password: string;
    fullName: string;
  },
  errorMessage?: string,
) => {
  try {
    const { data } = await api.post(`/signup`, values);
    return data;
  } catch (e) {
    toastError(errorMessage);
  }
};

export const logout = async () => {
  await removeCookie('blog-jwt-token');
  await Router.push('/');
};

export const updateUser = async (
  values,
  id: number,
  successMessage?: string,
  errorMessage?: string,
) => {
  try {
    await api.put(`/users/${id}`, values);
    toastSuccess(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};

/*export const deleteUser = async (id, successMessage, errorMessage) => {
  try {
    await api.delete(`/users/${id}`);
    toastSuccess(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};*/

export const deleteUserByAdmin = async (id: number) => {
  try {
    await api.delete(`/users/admin/${id}`);
    toastSuccess('Utilisateur supprimé');
  } catch (e) {
    toastError('Une erreur est survenue');
  }
};

/*
export const sendingMail = async (values, successMessage, errorMessage) => {
  try {
    await axios.post(process.env.NEXT_PUBLIC_SENDMAIL, values);
    toastSuccess(successMessage);
  } catch (e) {
    toastError(errorMessage);
  }
};
*/
