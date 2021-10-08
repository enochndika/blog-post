import jwt from 'jwt-decode';
import fr from 'date-fns/locale/fr';
import enUS from 'date-fns/locale/en-US';
import formatDistance from 'date-fns/formatDistance';

export const getDistanceDateFormat = (value: Date, locale: string) => {
  const setLocale = locale === 'fr' ? fr : enUS;
  const date = new Date(value);

  return formatDistance(date, Date.now(), {
    addSuffix: true,
    includeSeconds: true,
    locale: setLocale,
  });
};

export const formatDate = (value, locale: string) => {
  const date = new Date(value);
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long',
    day: 'numeric',
  });
};

export const formatFullDate = (value, locale) => {
  const date = new Date(value);
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatNumericDate = (value, locale) => {
  const date = new Date(value);
  return date.toLocaleDateString(locale, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
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
