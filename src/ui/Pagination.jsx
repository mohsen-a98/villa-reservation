import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +searchParams.get("page") || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function handlePreviousButton() {
    if (currentPage === 1) return null;

    searchParams.set("page", currentPage - 1);
    setSearchParams(searchParams);
  }

  function handleNextButton() {
    if (currentPage === pageCount) return null;

    searchParams.set("page", currentPage + 1);
    setSearchParams(searchParams);
  }

  const buttonStyles =
    "flex items-center gap-1 transition hover:bg-indigo-600 hover:dark:bg-indigo-700 px-2 py-1 rounded-md hover:text-white disabled:hover:bg-transparent disabled:hover:text-black disabled:cursor-not-allowed";

  return (
    <div className="flex items-center justify-between rounded-b-md bg-gray-100 px-5 py-4 dark:bg-gray-900 dark:text-gray-300">
      <div className="flex items-center gap-3">
        <button
          className={buttonStyles}
          onClick={handlePreviousButton}
          disabled={currentPage === 1}
        >
          <HiChevronRight />
          قبلی
        </button>
        <button
          className={buttonStyles}
          onClick={handleNextButton}
          disabled={currentPage === pageCount}
        >
          بعدی
          <HiChevronLeft />
        </button>
      </div>
      <p>
        نمایش {(currentPage - 1) * PAGE_SIZE + 1} تا{" "}
        {currentPage === pageCount ? count : currentPage * PAGE_SIZE} از {count}{" "}
        نتیجه
      </p>
    </div>
  );
}

export default Pagination;
