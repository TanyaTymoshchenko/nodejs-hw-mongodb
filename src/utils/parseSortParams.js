import { SORT_ORDER, keysOfContact } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (!isKnownOrder) return SORT_ORDER.ASC;
  return sortOrder;
};

const parseSortBy = (sortBy) => {
  const isKnownSortBy = keysOfContact.includes(sortBy);
  if (!isKnownSortBy) return '_id';
  return sortBy;
};

const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;
  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);
  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

export default parseSortParams;