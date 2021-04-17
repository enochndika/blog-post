import useSWR from 'swr';
import api from '../utils/axios';
import { getCookieFromBrowser } from './cookies';
import { decodeToken } from '../utils/formats';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useUser(username: number) {
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
}

export function loggedUser() {
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
}

export const useAuthenticated = () => {
  const router = useRouter();
  const token = getCookieFromBrowser('blog-jwt-token');

  useEffect(() => {
    if (!token) {
      router.replace('/');
    }
  }, [token, router]);

  return { isAuthenticated: token };
};
