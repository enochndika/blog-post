import jwt from "jwt-decode";

export const formatDate = (value) => {
  const options = {
    month: "long",
    day: "numeric",
  };
  const date = new Date(value);
  return date.toLocaleDateString("fr-FR", options);
};

export const formatFullDate = (value) => {
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  };
  const date = new Date(value);
  return date.toLocaleDateString("en-EN", options);
};

export const formatNumericDate = (value) => {
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const date = new Date(value);
  return date.toLocaleDateString("fr-FR", options);
};
export const priceFormatted = (value) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "USD",
  }).format(value);
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

export const getUserId = (token) => {
  const userData = token ? jwt(token) : null;
  return userData?.id;
};

export const checkLikeExist = (likes, user) => {
  return likes && likes.map((like) => like.userId).includes(user && user.id);
};

export const checkLikeNotExist = (likes, user) => {
  return likes && likes.map((like) => like.userId).includes(user && !user.id);
};
export function findWithAttr(array) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i]) {
      return i;
    }
  }
  return -1;
}

export function getIndex(comments) {
  comments.forEach((val) => {
    console.log(val.id);
  });
}
