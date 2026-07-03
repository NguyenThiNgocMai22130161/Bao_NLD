type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const pages = new Set<number>([1, totalPages]);

  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page > 1 && page < totalPages) {
      pages.add(page);
    }
  }

  return Array.from(pages).sort((left, right) => left - right);
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mt-8 flex justify-center px-4">
      <div className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <button
          className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Trước
        </button>

        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const hasGap = previousPage !== undefined && page - previousPage > 1;

          return (
            <div key={page} className="flex items-center gap-1">
              {hasGap ? (
                <span className="px-2 text-sm text-slate-400">...</span>
              ) : null}

              <button
                className={`min-w-11 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  page === currentPage
                    ? 'bg-[#004b9a] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </div>
          );
        })}

        <button
          className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Sau
        </button>
      </div>
    </div>
  );
}
