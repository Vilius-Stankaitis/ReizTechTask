import "./styles.css";

type PaginationProps = {
  pageIndex: number;
  totalPages: number;
  totalCountriesNumber: number;
  onChangePage: (index: number) => void;
};

const Pagination = ({
  pageIndex,
  totalPages,
  totalCountriesNumber,
  onChangePage,
}: PaginationProps) => {
  const lastPageIndex = Math.ceil(totalPages);

  const disabled = totalPages > pageIndex;

  const text = `Showing ${pageIndex} of ${lastPageIndex} pages. Total ${totalCountriesNumber} results.`;

  return (
    <div id="pagination">
      <p>{text}</p>

      <button
        onClick={() => onChangePage(pageIndex - 1)}
        disabled={pageIndex === 1}
      >
        Previous
      </button>

      <button onClick={() => onChangePage(pageIndex + 1)} disabled={!disabled}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
