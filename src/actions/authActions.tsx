import api from '@/config/axios';
import { toastError } from '@/utils/toast';
import { removeCookie, setCookie } from '@/config/cookies';

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
};

export { logout, signin, signup };
