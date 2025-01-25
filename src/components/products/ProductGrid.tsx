'use client';

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { useInView } from 'react-intersection-observer';
import { useEffect, useCallback } from 'react';
import { ProductSkeleton } from "./ProductSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  onProductClick: (productId: string) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
  isFilterLoading?: boolean;
  error?: Error | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductGrid({ 
  products, 
  viewMode, 
  onProductClick, 
  hasMore = false, 
  onLoadMore,
  isLoading = false,
  isFilterLoading = false,
  error = null,
  currentPage,
  totalPages,
  onPageChange
}: ProductGridProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 100
  });

  const handleInView = useCallback(() => {
    if (inView && hasMore && onLoadMore && !isLoading && !isFilterLoading) {
      onLoadMore();
    }
  }, [inView, hasMore, onLoadMore, isLoading, isFilterLoading]);

  useEffect(() => {
    handleInView();
  }, [handleInView]);

  const gridClassName = viewMode === 'grid'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
    : 'flex flex-col gap-4';

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Siempre mostrar la primera página
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded",
          currentPage === 1 ? "text-black bg-black/10" : "text-gray-500"
        )}
      >
        1
      </button>
    );

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pages.push(<span key="start-ellipsis">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded",
            currentPage === i ? "text-black bg-black/10" : "text-gray-500"
          )}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(<span key="end-ellipsis">...</span>);
    }

    // Siempre mostrar la última página si hay más de una página
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded",
            currentPage === totalPages ? "text-black bg-black/10" : "text-gray-500"
          )}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-between gap-2 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "flex items-center justify-between gap-2 p-2 rounded-[8px] w-[120px]",
            currentPage === 1 
              ? "text-gray-300 border border-gray-300 cursor-not-allowed" 
              : "text-gray-500 border border-black/10 hover:text-black hover:border hover:border-black",
            
          )}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            className={cn(
              "w-5 h-5",
              currentPage === 1 
                ? "stroke-gray-300 " 
                : "stroke-gray-500"
            )}
          >
            <path 
              d="M15.8334 10H4.16675M4.16675 10L10.0001 15.8333M4.16675 10L10.0001 4.16667"
              strokeWidth="1.67" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Previous
        </button>

        <div className="flex items-center gap-2 ">
          {pages}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "flex items-center justify-between gap-2 p-2 rounded-[8px] w-[120px]",
            currentPage === totalPages 
              ? "text-gray-300 border border-gray-300 cursor-not-allowed" 
              : "text-gray-500 border border-black/10 hover:text-black hover:border hover:border-black",
          )}
        >
          Next
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            className={cn(
              "w-5 h-5",
              currentPage === totalPages 
                ? "stroke-gray-300" 
                : "stroke-gray-500"
            )}
          >
            <path 
              d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16667M15.8334 10L10.0001 15.8333"
              strokeWidth="1.67" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error.message || 'An error occurred while loading products'}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div 
        className={gridClassName} 
        aria-busy="true" 
        role="grid"
        aria-label="Loading products"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div 
        className="text-center py-8 text-muted-foreground"
        role="status"
        aria-label="No products found"
      >
        No products found
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto" role="region" aria-label="Products grid">
      <div 
        className={cn(
          "grid gap-8",
          "grid-cols-1",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "justify-items-center",
          isFilterLoading ? 'opacity-50' : ''
        )}
        role={viewMode === 'grid' ? 'grid' : 'list'}
        aria-busy={isFilterLoading}
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onClick={onProductClick}
            aria-setsize={products.length}
            aria-posinset={index + 1}
          />
        ))}
      </div>

      {renderPagination()}

      {hasMore && (
        <div 
          ref={ref} 
          className="w-full flex justify-center"
          aria-hidden="true"
        >
          <ProductSkeleton />
        </div>
      )}
    </div>
  );
}

export function ProductGridTable({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn(
      "grid gap-4 w-full",
      "grid-cols-1",
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "lg:grid-cols-4",
      "xl:grid-cols-5"
    )}>
      {children}
    </div>
  );
} 