type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-10">
      <ul className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 border rounded ${
                page === currentPage
                  ? "bg-[#004b9a] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
