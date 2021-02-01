import cookie from "js-cookie";

export const setCookie = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 2,
      path: "/",
    });
  }
};

export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    cookie.remove(key);
  }
};

export const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};
