import useSWR from 'swr';
import Router from 'next/router';

import {
  setCookie,
  removeCookie,
  getCookieFromBrowser,
} from '@/config/cookies';
import api from '@/config/axios';
import { fetcher } from './fetcher';
import { decodeToken } from '@/utils/formats';
import { toastError, toastSuccess } from '@/utils/toast';

const useFetchUserProfile = () => {
  const token = getCookieFromBrowser('blog-jwt-token');
  const username = decodeToken(token);

  const { data, error, mutate } = useSWR(
    username ? `/users/${username}` : null,
    fetcher,
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

const signin = async (
  data: {
    username: string;
    password: string;
  },
  error: string,
) => {
  try {
    const { data: token } = await api.post(`/auth`, data);
    await setCookie('blog-jwt-token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    return token;
  } catch (e) {
    toastError(error);
  }
};

const signup = async (
  values: {
    username: string;
    password: string;
    fullName: string;
  },
  errorMessage?: string,
) => {
  try {
    const { data } = await api.post('/users', values);
    return data;
  } catch (e) {
    toastError(errorMessage);
  }
};

const logout = async () => {
  await removeCookie('blog-jwt-token');
  await Router.push('/');
};

const updateUser = async (
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

const deleteUserByAdmin = async (id: number) => {
  try {
    await api.delete(`/users/admin/${id}`);
    toastSuccess('Utilisateur supprimé');
  } catch (e) {
    toastError('Une erreur est survenue');
  }
};

export {
  deleteUserByAdmin,
  useFetchUserProfile,
  updateUser,
  logout,
  signin,
  signup,
};
