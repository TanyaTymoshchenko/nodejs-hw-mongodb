export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = (totalPages - page) > 0;
  return {
    totalItems: count,
    page,
    perPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};