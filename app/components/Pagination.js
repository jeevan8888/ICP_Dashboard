'use client';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems
}) {
  const pageSizeOptions = [5, 10, 20, 50];

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none pr-8 relative"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em'
          }}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size} className="py-1">
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-700">
          {((currentPage - 1) * pageSize) + 1}-
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 border rounded-md disabled:opacity-50 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          Previous
        </button>
        <span className="px-1 py-0.5">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 border rounded-md disabled:opacity-50 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}