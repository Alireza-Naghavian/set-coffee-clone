import { DOTS, usePagination } from "@/hooks/helper-hooks/usePagination";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useCallback } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export interface Props {
  onPageChange?: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  categoryId?: string;
}

const Pagination: React.FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  categoryId,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    categoryId,
  });

  const location = useSearchParams();
  const navigate = useRouter();
  const page = location.get("page");

  useEffect(() => {
    if (page && onPageChange) {
      onPageChange(parseInt(page, 10));
    }
  }, [page, onPageChange]);

  const changePageHandler = useCallback(
    (pageNumber: number) => {
      const newParams = new URLSearchParams(location);
      newParams.set("page", pageNumber.toString());
      navigate.replace(`?${newParams.toString()}`);
    },
    [location, navigate]
  );

  if (!paginationRange || !onPageChange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    const lastPage = Number(paginationRange[paginationRange.length - 1]); // تبدیل به عدد
    if (Number(currentPage) < lastPage) {
      onPageChange(Number(currentPage) + 1);
      changePageHandler(Number(currentPage) + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      changePageHandler(currentPage - 1);
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={`flex-center mx-auto gap-x-1 child:w-8 child:h-8 mr-auto`}>
      {/* Left navigation arrow */}
      <button
        className="bg-[#a82624] hover:bg-main_brown text-white rounded-full"
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        <li
          className={`rounded-full text-white tr-300 font-Shabnam_B bg-[#a82624] w-full h-full flex-center ${
            currentPage === 1 ? "opacity-50" : "hover:bg-main_brown"
          }`}
        >
          <FiArrowRight />
        </li>
      </button>

      {paginationRange.map((pageNumber, index) => (
        <React.Fragment key={index}>
          {pageNumber === DOTS ? (
            <li className="font-Shabnam_B px-3 text-center cursor-auto">
              &#8230;
            </li>
          ) : (
            <button
              className={`tr-300 focus:outline-none ${
                pageNumber === currentPage
                  ? "bg-[#a82624] hover:bg-main_brown text-white"
                  : "border-2 hover:bg-[#a82624] border-[#a82624] hover:text-white"
              } font-Shabnam_B rounded-full`}
              onClick={() => changePageHandler(Number(pageNumber))}
            >
              <li className="bg-transparent">{pageNumber.toLocaleString("fa-IR")}</li>
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Right Navigation arrow */}
      <button
        className="bg-[#a82624] hover:bg-main_brown text-white rounded-full"
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <li
          className={`rounded-full text-white tr-300 bg-[#a82624] w-full h-full flex-center ${
            currentPage === lastPage ? "opacity-50" : "hover:bg-main_brown"
          }`}
        >
          <FiArrowLeft />
        </li>
      </button>
    </ul>
  );
};

export default Pagination;
