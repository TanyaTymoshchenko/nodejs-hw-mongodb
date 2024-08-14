import { contactTypes } from '../constants/index.js';

const parseBoolean = (maybeBoolean) => {
  if (typeof maybeBoolean !== 'string') return;
  if (maybeBoolean === 'true') {
    return true;
  }
  if (maybeBoolean === 'false') {
    return false;
  }
  return;
};

const parseContactType = (maybeContactType) => {
  if (typeof maybeContactType !== 'string') return;
  if (contactTypes.includes(maybeContactType)) {
    return maybeContactType;
  }
  return;
};

export const parseFilterParams = (query) => {
  const { isFavorite, contactType } = query;
  const parsedIsFavorite = parseBoolean(isFavorite);
  const parsedContactType = parseContactType(contactType);

  return { isFavorite: parsedIsFavorite, contactType: parsedContactType };
};