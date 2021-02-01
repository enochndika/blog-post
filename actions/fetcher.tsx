import api from "../utils/axios";

export const fetcher = (url: string) =>
  api.get(url).then((res) => res.data.data);

export const fetches = (url: string) => api.get(url).then((res) => res.data);
