import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookieFromBrowser } from './cookies';

// redirect user to the home page if he is not authenticated
export default function useAuthenticated() {
  const router = useRouter();
  const token = getCookieFromBrowser('blog-jwt-token');

  useEffect(() => {
    if (!token) {
      router.replace('/');
    }
  }, [token, router]);

  return { isAuthenticated: token };
}
