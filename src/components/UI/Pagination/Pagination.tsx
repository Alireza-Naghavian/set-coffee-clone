import { DOTS, usePagination } from "@/hooks/helper-hooks/usePagination";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
export interface Props {
  onPageChange?: any;
  totalCount: number;
  siblingCount?: 1;
  currentPage: number;
  pageSize: number;
  categoryId?: string;
}

const Pagination: React.FC<Props> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    categoryId,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    categoryId,
  });
  const location = useSearchParams();
  const navigate = useRouter();
  const page = location.get("page")
  const newParams = new URLSearchParams(location);
  useEffect(()=>{
if(page){
  onPageChange(+(page))
}
  },[page,onPageChange])
  const changePageHandler = (pageNumber: any) => {
    newParams.set("page", pageNumber.toString());
    navigate.replace(`?${newParams.toString()}`);
  };
  if (paginationRange === undefined || onPageChange === undefined) return null;
  if (currentPage === 0 || paginationRange.length < 2) return null
  const onNext = () => {
    onPageChange(currentPage + 1);
    changePageHandler(currentPage + 1)
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
    changePageHandler(currentPage - 1)
  };
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={`flex-center  mx-auto gap-x-1  child:w-8 child:h-8  mr-auto  `}
    >
      {/* Left navigation arrow */}
      <button className="bg-[#a82624] hover:bg-main_brown text-white rounded-full" disabled={currentPage === 1}>
        <li
          className={` rounded-full text-white tr-300 font-Shabnam_B  bg-[#a82624]
          w-full h-full flex-center ${currentPage === 1 ? "opacity-50" : "hover:bg-main_brown"}`}
          onClick={onPrevious}>
          <FiArrowRight />
        </li>
      </button>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li
              key={index}
              className=" font-Shabnam_B px-3 text-center cursor-auto">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <>
            {currentPage && (
              <button
                key={index}
                className={`tr-300 focus:outline-none  ${
                  pageNumber === currentPage
                    ? "bg-[#a82624] hover:bg-main_brown text-white"
                    : "border-2  hover:bg-[#a82624] border-[#a82624] hover:text-white "
                }  
                    font-Shabnam_B  rounded-full`}
                onClick={() => {changePageHandler(pageNumber);}}>
                <li className="bg-transparent" key={index}>{pageNumber.toLocaleString("fa-Ir")}</li>
              </button>
            )}
          </>
        );
      })}
      {/*  Right Navigation arrow */}
      <button
        className="bg-[#a82624] hover:bg-main_brown text-white rounded-full"
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <li
          className={`rounded-full text-white tr-300  
            bg-[#a82624]  w-full h-full 
            flex-center ${currentPage === lastPage ? "opacity-50" : "hover:bg-main_brown"}`}
          onClick={onNext}
        >
          <FiArrowLeft />
        </li>
      </button>
    </ul>
  );
};

export default Pagination;
