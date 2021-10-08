import cookie from 'js-cookie';

const setCookie = (key: string, value: string) => {
  const today = new Date();
  const expirationDate = new Date(today);

  expirationDate.setDate(today.getDate() + 30);
  const expireIn = parseInt(String(expirationDate.getTime() / 1000), 10);

  if (typeof window !== 'undefined') {
    cookie.set(key, value, {
      expires: expireIn,
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
