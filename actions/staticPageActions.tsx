import api from "../utils/axios";
import { toastError } from "../utils/toast";
import useSWR from "swr";
import { fetcher } from "./fetcher";

export const useFetchStaticPages = () => {
  const { data, error, mutate } = useSWR(`/static-pages`, fetcher);
  return {
    pages: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export const addStaticPage = async (values) => {
  const data = {
    page: values.page,
  };
  try {
    await api.post(`/static-pages`, data);
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};

/*
export const deleteStaticPage = async (id, mutate) => {
  try {
    await api.delete(`/static-pages/admin/${id}`);
    await mutate();
  } catch (e) {
    toastError("Une erreur est survenue");
  }
};
*/
