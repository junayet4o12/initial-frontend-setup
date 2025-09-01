"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { handleSetSearchParams } from "@/lib/utils";

interface PaginationWithParamsProps {
  totalPages: number;
}

export function Pagination({
  totalPages,
}: PaginationWithParamsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);

  const createPageURL = (pageNumber: number | string) => {
    handleSetSearchParams({ page: pageNumber.toString() }, searchParams, router)
  };

  const goToPage = (page: number) => {
    createPageURL(page)
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    if (currentPage > 3) {
      pageNumbers.push(1);
      if (currentPage > 4) {
        pageNumbers.push("...");
      }
    }

    // Show current page and adjacent pages
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pageNumbers.push(i);
    }

    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };
  if (totalPages < 2) {
    return ''
  }

  return (
    <div className="flex items-center justify-end space-x-1.5 py-6">
      <button
        className={`
          group relative h-10 w-10 flex items-center justify-center 
          rounded-lg border border-gray-200 bg-white shadow-sm
          transition-all duration-200 ease-out
          ${currentPage === 1
            ? 'cursor-not-allowed opacity-50'
            : 'hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
          }
        `}
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className={`
          h-4 w-4 transition-all duration-200
          ${currentPage === 1
            ? 'text-gray-300'
            : 'text-gray-600 group-hover:text-primary group-hover:-translate-x-0.5'
          }
        `} />
        <span className="sr-only">Previous page</span>
      </button>

      <div className="flex items-center space-x-1.5 mx-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-2 text-gray-400 font-medium select-none"
            >
              ...
            </span>
          ) : (
            <button
              className={`
                group relative h-10 min-w-[2.5rem] px-3 flex items-center justify-center 
                rounded-lg border font-medium text-sm
                transition-all duration-200 ease-out
                ${currentPage === page
                  ? `
                    bg-primary text-white border-primary shadow-lg shadow-primary/25
                    hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30
                    hover:-translate-y-0.5 active:translate-y-0
                    scale-105
                  `
                  : `
                    bg-white border-gray-200 text-gray-700 shadow-sm
                    hover:bg-primary/5 hover:border-primary/30 hover:text-primary hover:shadow-md
                    hover:-translate-y-0.5 active:translate-y-0
                  `
                }
              `}
              key={`page-${page}`}
              onClick={() => goToPage(page as number)}
            >
              <span className="relative z-10">{page}</span>
              {currentPage === page && (
                <div className="absolute inset-0 bg-primary/20 rounded-lg opacity-20 blur-sm"></div>
              )}
            </button>
          )
        )}
      </div>

      <button
        className={`
          group relative h-10 w-10 flex items-center justify-center 
          rounded-lg border border-gray-200 bg-white shadow-sm
          transition-all duration-200 ease-out
          ${currentPage === totalPages
            ? 'cursor-not-allowed opacity-50'
            : 'hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
          }
        `}
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className={`
          h-4 w-4 transition-all duration-200
          ${currentPage === totalPages
            ? 'text-gray-300'
            : 'text-gray-600 group-hover:text-primary group-hover:translate-x-0.5'
          }
        `} />
        <span className="sr-only">Next page</span>
      </button>
    </div>
  );
}