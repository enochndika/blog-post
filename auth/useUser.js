import useSWR from "swr";
import api from "../utils/axios";
import { getCookieFromBrowser } from "./cookies";
import { decodeToken } from "../utils/formats";

const fetcher = (url) => api.get(url).then((res) => res.data);

export function useUser(username) {
  const { data, error, mutate } = useSWR(
    username ? `/users/${username}` : null,
    fetcher
  );
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function loggedUser() {
  const token = getCookieFromBrowser("blog-jwt-token");
  const username = decodeToken(token);
  const { data, error, mutate } = useSWR(
    username ? `/users/${username}` : null,
    fetcher
  );
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
