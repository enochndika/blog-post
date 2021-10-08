import cookie from 'js-cookie';

const setCookie = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    cookie.set(key, value, {
      expires: 2,
      path: '/',
    });
  }
};

const removeCookie = (key: string) => {
  if (typeof window !== 'undefined') {
    cookie.remove(key);
  }
};

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

export { setCookie, removeCookie, getCookieFromBrowser };
