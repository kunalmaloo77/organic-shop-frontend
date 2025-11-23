import React from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = (props) => {
  const { totalPages } = props;
  const pageCount = totalPages;
  const [searchParams, setSearchParams] = useSearchParams(
    window.location.search
  );
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handleNextPage = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: currentPage + 1,
    });
  };

  const handlePrevPage = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: currentPage - 1,
    });
  };

  return (
    <>
      <div className="flex items-center my-10">
        {currentPage === 1 ? (
          <button
            className="px-3 py-2 m-2 border-[1px] border-gray-400 text-gray-400"
            disabled
          >
            ←
          </button>
        ) : (
          <button
            onClick={handlePrevPage}
            className="px-3 py-2 m-2 border-[1px] border-nature-green text-nature-green hover:bg-nature-green hover:text-white transition-colors"
          >
            ←
          </button>
        )}
        <div className="text-[#8bc34a]">
          Page {currentPage} of {pageCount}
        </div>
        {currentPage === pageCount ? (
          <button
            className="px-3 py-2 m-2 border-[1px] border-gray-400 text-gray-400"
            disabled
          >
            →
          </button>
        ) : (
          <button
            onClick={handleNextPage}
            className="px-3 py-2 m-2 border-[1px] border-nature-green text-nature-green hover:bg-nature-green hover:text-white transition-colors"
          >
            →
          </button>
        )}
      </div>
    </>
  );
};

export default Pagination;
