'use client';

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { useInView } from 'react-intersection-observer';
import { useEffect, useCallback } from 'react';
import { ProductSkeleton } from "./ProductSkeleton";

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  onProductClick: (productId: string) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
  isFilterLoading?: boolean;
}

export function ProductGrid({ 
  products, 
  viewMode, 
  onProductClick, 
  hasMore = false, 
  onLoadMore,
  isLoading = false,
  isFilterLoading = false
}: ProductGridProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 100
  });

  const handleInView = useCallback(() => {
    if (inView && hasMore && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasMore, onLoadMore]);

  useEffect(() => {
    handleInView();
  }, [handleInView]);

  const gridClassName = viewMode === 'grid'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
    : 'flex flex-col gap-4';

  if (isLoading) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`${gridClassName} ${isFilterLoading ? 'opacity-50' : ''}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onClick={onProductClick}
          />
        ))}
      </div>
      {hasMore && (
        <div ref={ref} className="w-full flex justify-center">
          <ProductSkeleton />
        </div>
      )}
    </div>
  );
} 