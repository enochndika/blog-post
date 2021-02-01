import jwt from "jwt-decode";

export const formatDate = (value, locale: string) => {
  const options = {
    month: "long",
    day: "numeric",
  };
  const date = new Date(value);
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", options);
};

export const formatFullDate = (value, locale) => {
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  };
  const date = new Date(value);
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", options);
};

export const formatNumericDate = (value, locale) => {
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const date = new Date(value);
  return date.toLocaleDateString(locale, options);
};

export const getTotalLikes = (value) => {
  const data = value && value.map((star) => star.like);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return data.reduce(reducer);
};

export const decodeToken = (token: string) => {
  const userData: any = token ? jwt(token) : null;
  return userData?.username;
};

export const checkLikeExist = (likes: any, user: any) => {
  return likes && likes.map((like) => like.userId).includes(user && user.id);
};

export const sliceText = (value: string, limit: number) => {
  if (value && value.length > limit) {
    return `${value.slice(0, limit)} ...`;
  } else if (value.length < limit) {
    return value;
  }
};
