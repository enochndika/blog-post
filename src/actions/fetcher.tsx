import api from '@/config/axios';

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

const fetches = (url: string) => api.get(url).then((res) => res.data);

export { fetcher, fetches };
