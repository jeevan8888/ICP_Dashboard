export function usePagination(items, pageSize) {
  const totalPages = Math.ceil(items.length / pageSize);
  
  const paginateItems = (currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  };

  return {
    totalPages,
    paginateItems
  };
}