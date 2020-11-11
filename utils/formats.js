import jwt from "jwt-decode";

export const formatDate = (value, locale) => {
  const options = {
    month: "long",
    day: "numeric",
  };
  const date = new Date(value);
  return date.toLocaleDateString(locale, options);
};

export const formatFullDate = (value, locale) => {
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  };
  const date = new Date(value);
  return date.toLocaleDateString(locale, options);
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

export const decodeToken = (token) => {
  const userData = token ? jwt(token) : null;
  return userData?.username;
};

export const checkLikeExist = (likes, user) => {
  return likes && likes.map((like) => like.userId).includes(user && user.id);
};
