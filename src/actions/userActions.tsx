import useSWR from 'swr';

import api from '@/config/axios';
import { fetcher } from './fetcher';
import { decodeToken } from '@/utils/formats';
import { getCookieFromBrowser } from '@/config/cookies';
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

export { deleteUserByAdmin, useFetchUserProfile, updateUser };
